const gluestack_db = require(`../../library/gluestack-ui_dump.json`)

async function run(query) {
  return gluestack_db.filter((e) =>
    query.library_components
      .map((e) => e.toLowerCase())
      .includes(e.name.toLowerCase())
  )
}

module.exports = {
  run
}
