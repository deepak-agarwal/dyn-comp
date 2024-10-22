const ts = require('typescript')

function compileReactComponent(tsxCode) {
  console.log('************ compile started ****************')
  const compilerOptions = {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES5,
    allowSyntheticDefaultImports: true
  }

  const result = ts.transpileModule(tsxCode, {
    compilerOptions: compilerOptions,
    reportDiagnostics: true
  })

  if (result.diagnostics && result.diagnostics.length > 0) {
    const errors = result.diagnostics.map((diagnostic) => {
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start
        )
        return `Error in ${diagnostic.file.fileName} (${line + 1},${
          character + 1
        }): ${message}`
      }
      return `Error: ${message}`
    })
    return { error: true, messages: errors }
  }
  console.log('************** Compile ends***********')
  return { error: false, output: result.outputText }
}

module.exports = compileReactComponent
