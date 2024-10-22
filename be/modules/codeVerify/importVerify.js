const fs = require('fs').promises

async function checkImports(filePath, modulesToSkip) {
  console.log('************ Import check starts ***********')
  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const importRegex = /import\s+(?:[\w*\s{},]*\s+from\s+)?(['"])(.*?)\1/gs
    const importStatements = fileContent.match(importRegex)
    if (importStatements) {
      for (const importStatement of importStatements) {
        const moduleNameMatch = importStatement.match(/from\s+(['"])(.*?)\1/)
        if (moduleNameMatch && moduleNameMatch[2]) {
          const moduleName = moduleNameMatch[2]
          if (modulesToSkip.includes(moduleName)) {
            continue
          }
          try {
            require.resolve(moduleName)
          } catch (error) {
            return {
              error: true,
              messages: `Missing module: ${moduleName}`
            }
          }
        }
      }
    }
    console.log('************ Import check ends ***********')
    return {
      error: false
    }
  } catch (error) {
    return {
      error: true,
      messages: `Error: ${error.message}`
    }
  }
}

module.exports = checkImports
