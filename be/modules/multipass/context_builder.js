const tiktoken = require('@dqbd/tiktoken')
const tiktokenEncoder = tiktoken.get_encoding('cl100k_base')

const rag_library_components = require(`./rag_library_components.js`)
const style = require('../../library/gluestack-style/result.json')

console.log(style)
require('dotenv').config()

async function run(query, req) {
  // -> gets component design {name,description,library_components,icons}
  // -> builds completion context for library components + icons

  let retrieved = {
    library_components: !query.library_components
      ? []
      : await rag_library_components.run({
          library_components: query.library_components.map((e) => e.name)
        })
  }

  retrieved.library_components = retrieved.library_components.map((e, idx) => {
    const examples_total_tokens = tiktokenEncoder.encode(
      e.docs.examples
        .map(
          (example) => example.source + '```\n' + example.code.trim() + '\n```'
        )
        .join('\n\n')
    ).length

    console.log(
      `tokens for context entry ${e.name} : ${examples_total_tokens} (limit : ${process.env.CONTEXT_TOKENS_PER_LIBRARY_COMPONENT_LIMIT})`
    )

    if (
      examples_total_tokens >
      parseInt(process.env.CONTEXT_TOKENS_PER_LIBRARY_COMPONENT_LIMIT)
    ) {
      let updated_library_component = { ...e }
      updated_library_component.docs.examples = [
        e.docs.examples[Math.floor(Math.random() * e.docs.examples.length)]
      ]
      return updated_library_component
    }
    return e
  })

  const initialStyleContent = ''

  const styleContent = style.reduce(
    (acc, curr) => acc + curr.result,
    initialStyleContent
  )

  const returnValue = [
    ...retrieved.library_components.map((e, idx) => {
      return {
        role: `user`,
        content:
          `Library components can be used while making the new React component\n\n` +
          `Suggested library component (${idx + 1}/${
            retrieved.library_components.length
          }) : ${e.name} - ${e.description}\n` +
          `Suggested usage : ${query.library_components[idx].usage}\n\n\n` +
          `# ${e.name} can be imported into the new component like this:\n` +
          '```tsx\n' +
          e.docs.import.code.trim() +
          '\n```\n\n---\n\n' +
          `# examples of how ${e.name} can be used inside the new component:\n` +
          e.docs.use
            .map((block) => {
              return '```tsx\n' + block.code.trim() + '\n```'
            })
            .join(`\n\n`) +
          '\n\n---\n\n' +
          `# full code examples of React components that use ${e.name} :\n` +
          e.docs.examples
            .map((example) => {
              return example.source + '```\n' + example.code.trim() + '\n```'
            })
            .join(`\n\n`)
      }
    }),
    {
      role: 'user',
      content:
        `The style for this library uses the following ways be careful ans use only the style for this library` +
        styleContent
    }
  ].filter((e) => e)

  req.logger.info(returnValue)

  return returnValue
}

module.exports = {
  run
}
