const fs = require('fs')
const path = require('path')
const markdownIt = require('markdown-it')()

const mdxFolderPath = 'gluestack-style' // Relative path to the folder in the same directory
const outputJsonPath = 'result.json' // Replace with the desired output JSON file path

// Check if the directory exists
if (!fs.existsSync(mdxFolderPath)) {
  console.error(`Error: The directory '${mdxFolderPath}' does not exist.`)
  process.exit(1) // Exit the script with an error code
}

// Initialize an array to store the results
const results = []

// Read all files in the MDX folder
fs.readdir(mdxFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading MDX folder:', err)
    return
  }

  // Iterate over each MDX file
  files.forEach((file) => {
    const mdxFilePath = path.join(mdxFolderPath, file)

    // Read the MDX file content
    const mdxFileContent = fs.readFileSync(mdxFilePath, 'utf-8')

    // Parse the MDX content using markdown-it
    const result = markdownIt.render(mdxFileContent)

    // Push the result to the array
    results.push({
      filePath: mdxFilePath,
      result: mdxFileContent
    })

    // If all files are processed, write the results to a JSON file
    if (results.length === files.length) {
      writeResultsToJson(results)
    }
  })
})

// Function to write results to a JSON file
function writeResultsToJson(results) {
  fs.writeFileSync(outputJsonPath, JSON.stringify(results, null, 2), 'utf-8')
  console.log(`Results have been written to '${outputJsonPath}'.`)
}
