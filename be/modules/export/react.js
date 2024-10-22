const fs = require('fs')
const path = require('path')

const validate_component = require(`./validate_component.js`)

// export all generated stuff to react app folder
// target react app folder specified in .env : process.env.REACT_WEBAPP_DIR
require('dotenv').config()

function _mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

function _listdir(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory()
  })
}

_mkdir(`./generated/`)

async function save_component(query) {
  if (!query.code.length) return false

  _mkdir(`./generated/${query.email}`)
  _mkdir(`./generated/${query.email}/components`)
  _mkdir(`./generated/${query.email}/components/${query.componentId}`)

  // writes metadata
  fs.writeFileSync(
    `./generated/${query.email}/components/${query.componentId}/${query.version}.json`,
    JSON.stringify(query)
  )

  // writes tsx locally
  fs.writeFileSync(
    `./generated/${query.email}/components/${query.componentId}/${query.version}.tsx`,
    query.code
  )

  console.dir({
    saved: {
      metadata: `./generated/${query.email}/components/${query.componentId}/${query.version}.json`,
      component: `./generated/${query.email}/components/${query.componentId}/${query.version}.tsx`
    }
  })
}
async function dump_webapp({ email}) {
  // process.env.REACT_WEBAPP_DIR
  // writes components + metadata + general dump file in webapp
  console.dir({
    event: `> ./modules/export/react dump_webapp() started`,
    warn: 'if webapp crashes because of invalid generated components\nadd componentId and version to ./generated/export_ignore.txt\nthen run `node export_refresh.js` from server folder'
  })

  fs.rmSync(`${process.env.REACT_WEBAPP_DIR}/app/components/generated`, {
    recursive: true,
    force: true
  })
  _mkdir(`${process.env.REACT_WEBAPP_DIR}/app/components/generated`)

  const EXPORT_IGNORE = fs
    .readFileSync(`./generated/export_ignore.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((e) => e.trim())
    .filter((e) => e.length)

  console.dir({
    EXPORT_IGNORE: { './generated/export_ignore.txt': EXPORT_IGNORE }
  })

  const components_list = _listdir(`./generated/${email}/components`)
console.log(components_list)
  const components = components_list.map((dir) => {
    return {
      name: dir.toLowerCase(), // slug
      title: dir,
      desc: '',
      versions: fs
        .readdirSync(`./generated/${email}/components/${dir}`)
        .filter((e) => e.endsWith(`.tsx`))
        .sort()
        .map((e) => {
          const version = e.split(`.tsx`)[0]
          if (
            EXPORT_IGNORE.includes(`${dir} ${version}`.trim()) ||
            EXPORT_IGNORE.includes(dir)
          )
            return false
          return version
        })
        .filter((e) => e)
    }
  })

  // make and export general dump
  const generated_components_dump = { components }
  // make and export components + metadata

  fs.writeFileSync(
    `${process.env.REACT_WEBAPP_DIR}/app/data/generated_component.json`,
    JSON.stringify(generated_components_dump)
  )

  components_list.map((dir) => {
    // make metadata.
    const metadata_json = {
      componentId: dir,
      iterations: fs
        .readdirSync(`./generated/${email}/components/${dir}`)
        .filter((e) => e.endsWith(`.json`))
        .sort()
        .map((json_file) => {
          const component_metadata = JSON.parse(
            fs.readFileSync(
              `./generated/${email}/components/${dir}/${json_file}`,
              'utf-8'
            )
          )
          const validation_status = validate_component.validate_babel(
            fs.readFileSync(
              `./generated/${email}/components/${dir}/${
                json_file.split('.json')[0]
              }.tsx`,
              'utf-8'
            )
          )
          if (!validation_status) {
            console.dir({
              babel_validation_error: `./generated/${email}/components/${dir}/${
                json_file.split('.json')[0]
              }.tsx`
            })
            return false
          }
          if (
            EXPORT_IGNORE.includes(
              `${dir} ${component_metadata.version}`.trim()
            ) ||
            EXPORT_IGNORE.includes(dir)
          )
            return false

          return {
            version: component_metadata.version,
            prompt: component_metadata.prompt,
            timestamp: component_metadata.timestamp,
            code: component_metadata.code
          }
        })
        .filter((e) => e)
    }
    //console.dir(metadata_json)
    // make component dir from slug, save metadata.json

    _mkdir(
      `${
        process.env.REACT_WEBAPP_DIR
      }/app/components/generated/${dir.toLowerCase()}`
    )

    fs.writeFileSync(
      `${
        process.env.REACT_WEBAPP_DIR
      }/app/components/generated/${dir.toLowerCase()}/metadata.json`,
      JSON.stringify(metadata_json)
    )

    // copy tsx files
    fs.readdirSync(`./generated/${email}/components/${dir}`)
      .filter((e) => e.endsWith(`.tsx`))
      .map((tsx_file) => {
        const validation_status = validate_component.validate_babel(
          fs.readFileSync(`./generated/${email}/components/${dir}/${tsx_file}`, 'utf-8')
        )
        if (!validation_status) {
          console.dir({
            babel_validation_error: `./generated/${email}/components/${dir}/${tsx_file}`
          })
          return false
        }

        if (
          EXPORT_IGNORE.includes(
            `${dir} ${tsx_file.split('.tsx')[0]}`.trim()
          ) ||
          EXPORT_IGNORE.includes(dir)
        )
          return false

        fs.copyFileSync(
          `./generated/${email}/components/${dir}/${tsx_file}`,
          `${
            process.env.REACT_WEBAPP_DIR
          }/app/components/generated/${dir.toLowerCase()}/${tsx_file}`
        )
      })
  })
}

async function dump_component({ email,componentId}) {
  // process.env.REACT_WEBAPP_DIR
  // writes components + metadata + general dump file in webapp
  console.dir({
    event: `> ./modules/export/react dump_component() started`,
  })


  
  const component =  {
    name: componentId.toLowerCase(), 
    title: componentId,
    desc: '',
    versions: fs
    .readdirSync(`./generated/${email}/components/${componentId}`)
    .filter((e) => e.endsWith(`.tsx`))
    .sort()
    .map((e) => {
      const version = e.split(`.tsx`)[0]
      return version
    })
    .filter((e) => e)
  }
  
  console.log(component)

  const generatedComponentList = fs.readFileSync(`${process.env.REACT_WEBAPP_DIR}/app/data/generated_component.json`, 'utf-8')
  const generatedComponentListJson = JSON.parse(generatedComponentList)
  generatedComponentListJson.components.push(component)
  fs.writeFileSync(
    `${process.env.REACT_WEBAPP_DIR}/app/data/generated_component.json`,
    JSON.stringify(generatedComponentListJson)
  )


    // make metadata.
    const metadata_json = {
      componentId: componentId,
      iterations: fs
        .readdirSync(`./generated/${email}/components/${componentId}`)
        .filter((e) => e.endsWith(`.json`))
        .sort()
        .map((json_file) => {
          const component_metadata = JSON.parse(
            fs.readFileSync(
              `./generated/${email}/components/${componentId}/${json_file}`,
              'utf-8'
            )
          )

          return {
            version: component_metadata.version,
            prompt: component_metadata.prompt,
            timestamp: component_metadata.timestamp,
            code: component_metadata.code
          }
        })
        .filter((e) => e)
      }

    _mkdir(
      `${
        process.env.REACT_WEBAPP_DIR
      }/app/components/generated/${componentId.toLowerCase()}`
    )

    fs.writeFileSync(
      `${
        process.env.REACT_WEBAPP_DIR
      }/app/components/generated/${componentId.toLowerCase()}/metadata.json`,
      JSON.stringify(metadata_json)
    )

    // copy tsx files
    fs.readdirSync(`./generated/${email}/components/${componentId}`)
      .filter((e) => e.endsWith(`.tsx`))
      .map((tsx_file) => {
        fs.copyFileSync(
          `./generated/${email}/components/${componentId}/${tsx_file}`,
          `${
            process.env.REACT_WEBAPP_DIR
          }/app/components/generated/${componentId.toLowerCase()}/${tsx_file}`
        )
      })
}


module.exports = {
  save_component,
  dump_webapp,
  dump_component,
}
