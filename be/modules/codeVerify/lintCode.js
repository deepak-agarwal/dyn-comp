const tslint = require('tslint')
const fs = require('fs')

const tsLintGenCode = (path) => {
  console.log('********** Start lint check *******')
  const configurationFilename = './modules/codeVerify/tslint.json'
  const options = {
    fix: false,
    formatter: 'json'
  }

  const fileContents = fs.readFileSync(path, 'utf8')
  const linter = new tslint.Linter(options)
  const configuration = tslint.Configuration.findConfiguration(
    configurationFilename,
    path
  ).results
  linter.lint(path, fileContents, configuration)
  const result = linter.getResult()
  console.log('********** End lint check *******')
  if (result.errorCount > 0) {
    return {
      error: true,
      messages: result.output
    }
  }
  return {
    error: false
  }
}

module.exports = tsLintGenCode
