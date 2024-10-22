const fs = require('fs')
const path = require('path')
const markdownIt = require('markdown-it')()

function extractTsxCodeBlocks(markdownFilePath) {
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8')
  const tokens = markdownIt.parse(markdownContent, {})

  let tsxCodeBlocks = []
  let currentCodeBlock = ''

  for (const token of tokens) {
    if (token.type === 'fence' && token.info === 'jsx') {
      currentCodeBlock = token.content
      tsxCodeBlocks.push(currentCodeBlock)
    } else if (currentCodeBlock && token.type === 'fence') {
      currentCodeBlock = ''
    } else if (currentCodeBlock) {
      currentCodeBlock += '\n' + token.content
    }
  }

  return tsxCodeBlocks
}

async function build_from_docs_and_examples() {
  return (
    await Promise.all(
      fs.readdirSync(`./library/gluestack-ui/docs`).map(async (file) => {
        const slug = file.split('.mdx')[0]

        const tsx_blocks_docs = extractTsxCodeBlocks(
          path.join(`./library/gluestack-ui/docs`, file)
        ).map((block) => {
          return {
            source: slug,
            code: block.trim()
          }
        })

        let meta = {}

        console.log(`./library/gluestack-ui/docs`, file)
        fs.readFileSync(path.join(`./library/gluestack-ui/docs`, file), 'utf-8')
          .split('---')[1]
          ?.trim()
          .split('\n')
          .map((e) => {
            const split = e
              .trim()
              .split(':')
              .map((_e) => _e.trim())
            if (split[0] === `title`) meta.title = split[1]
            else if (split[0] === `description`) meta.description = split[1]
            else if (split[0] === `component`)
              meta.component = split[1] === 'true' ? true : false
          })

        if (!tsx_blocks_docs || !tsx_blocks_docs.length) return false
        if (!meta.component) return false

        const fileContent = fs.readFileSync(
          './library/gluestack-ui/variants/variants.json',
          'utf-8'
        )

        const jsonData = JSON.parse(fileContent)

        const arrayData = jsonData[slug]

        const variantsCode = arrayData.map((item) => ({
          source: slug,
          code: item
        }))
        console.log(variantsCode)

        return {
          name: meta.title,
          description: meta.description,
          docs_path: path.join(`./library/gluestack-ui/docs`, file),
          docs: {
            import: tsx_blocks_docs[0],
            use: [tsx_blocks_docs[1]],
            examples: [...tsx_blocks_docs.slice(2), ...variantsCode]
          }
        }
      })
    )
  ).filter((e) => e)
}

async function build() {
  const db = await build_from_docs_and_examples()
  fs.writeFileSync(`./library/gluestack-ui_dump.json`, JSON.stringify(db))
}
module.exports = {
  build
}
