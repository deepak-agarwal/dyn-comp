const fs = require("fs");

const design_task = require(`./modules/multipass/design_task.js`);
const iterate_task = require(`./modules/multipass/iterate_task.js`);

const context_builder = require(`./modules/multipass/context_builder.js`);
const generate_component = require(`./modules/multipass/generate_component.js`);

const export_react = require(`./modules/export/react.js`);

function _randomId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function new_component(req, request) {
  // {query}

  const task = await design_task.run(req, request); // -> { name, description{by_user,by_llm}, icons, library_components }
  const context = await context_builder.run(task, request); // -> context[]
  const result = await generate_component.new_component(
    { task, context },
    request
  ); // -> {error, code, message}
  /*
  const task = { name:`Dummy` , description: {by_user: `dummy prompt`} }
  const code = `import something_dummy;`
  */

  const componentId = task.name.replaceAll(" ", "") + `_` + _randomId(5);
  const timestamp = Date.now();
  // await export_react.save_component({
  //   componentId,
  //   slug: componentId.toLowerCase(),
  //   name: task.name,
  //   prompt: task.description.by_user,
  //   timestamp,
  //   version: `${timestamp}`,
  //   code: result.generated_code,
  //   compGenerationStatus: result.error ? `error` : `success`,
  //   email: request.email,
  // });
  // await export_react.dump_component({ email: request.email, componentId });
  return {
    componentId,
    version: `${timestamp}`,
    code: result.generated_code,
    compGenerationStatus: result.error ? `error` : `success`,
  };
}
async function iterate_component(req, request) {
  // {query : `user_query` , componentId ,}

  // fetch last version of component

  // const components_list = fs
  //   .readdirSync(`./generated/${request.email}/components/${req.componentId}`)
  //   .filter((e) => e.endsWith(`.json`))
  //   .sort();
  // const previous_component = {
  //   ...JSON.parse(
  //     fs.readFileSync(
  //       `./generated/${request.email}/components/${req.componentId}/${
  //         components_list.slice(-1)[0]
  //       }`,
  //       "utf-8"
  //     )
  //   ),
  //   code: fs.readFileSync(
  //     `./generated/${request.email}/components/${req.componentId}/${
  //       components_list.slice(-1)[0].split(".")[0]
  //     }.tsx`,
  //     "utf-8"
  //   ),
  // };
  // const first_component = {
  //   ...JSON.parse(
  //     fs.readFileSync(
  //       `./generated/${request.email}/components/${req.componentId}/${components_list[0]}`,
  //       "utf-8"
  //     )
  //   ),
  //   code: fs.readFileSync(
  //     `./generated/${request.email}/components/${req.componentId}/${
  //       components_list[0].split(".")[0]
  //     }.tsx`,
  //     "utf-8"
  //   ),
  // };

  const iteration_task = await iterate_task.run(
    {
      query: req.query,
      previous: {
        name: req.name,
        description: req.initialPrompt,
      },
    },
    request
  ); // -> { name, description{by_user,by_llm}, icons, library_components }

  const task = {
    name: req.name,
    ...iteration_task,
  };
  const iteration_context = await context_builder.run(task, request); // -> context[]
  const context = [
    ...iteration_context,
    /*
    {
      role: `user`,
      content: ``,
    },
    */
  ];

  const result = await generate_component.iterate_component(
    {
      task,
      context,
      previous: {
        description: req.initialPrompt,
        code: req.code,
      },
    },
    request
  ); // -> generated_code

  const componentId = req.componentId;
  const timestamp = Date.now();

  console.log("^^^^^^^^^^^^^ ");
  console.log(result, request);

  // await export_react.save_component({
  //   componentId,
  //   slug: componentId.toLowerCase(),
  //   name: task.name,
  //   prompt: task.description.by_user,
  //   timestamp,
  //   version: `${timestamp}`,
  //   code: result.generated_code,
  //   compGenerationStatus: result.error ? `error` : `success`,
  //   email: request.email,
  // });
  // await export_react.dump_webapp({ email: request.email });
  return {
    componentId,
    version: `${timestamp}`,
    code: result.generated_code,
    compGenerationStatus: result.error ? `error` : `success`,
  };
}
module.exports = {
  new_component,
  iterate_component,
};
