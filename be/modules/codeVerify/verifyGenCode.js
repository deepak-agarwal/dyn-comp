const fs = require('fs')
const checkImports = require('./importVerify.js')
const compileReactComponent = require('./tsCompile.js')
const tsLintGenCode = require('./lintCode.js')

async function verifyGenCode(path) {
  const modulesToSkip = ['react', '@gluestack-ui/themed', 'lucide-react-native']
  const importResult = await checkImports(path, modulesToSkip)

  if (importResult.error) {
    return {
      error: true,
      messages: importResult.messages
    }
  }

  const extractedCodeFromPath = fs.readFileSync(path, 'utf8')
  const result = await compileReactComponent(extractedCodeFromPath)

  if (result.error) {
    console.error('Compilation errors:', result.messages)
    return {
      error: true,
      messages: result.messages
    }
  }

  const lintCheck = await tsLintGenCode(path)

  if (lintCheck.error) {
    return {
      error: true,
      messages: lintCheck.messages
    }
  }
  return {
    error: false,
    output: result.output
  }
}

module.exports = verifyGenCode
