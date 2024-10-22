const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const tiktoken = require("@dqbd/tiktoken");
const verifyGenCode = require("../codeVerify/verifyGenCode");
const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");

require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function _mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}
_mkdir(`./generated/logs`);
_mkdir(`./generated/logs/generate_component`);
_mkdir(`./generated/components`);

async function generated_codeVerify(generated_code, counter) {
  /// Verify code here and compile if issue with code send back to llm to regnerate

  if (counter >= 3) {
    return {
      error: true,
      message: "code generation failed",
      generated_code: generated_code,
    };
  }

  fs.writeFileSync(`./modules/codeVerify/temp.tsx`, generated_code);
  const compileResult = await verifyGenCode(`./modules/codeVerify/temp.tsx`);
  console.log("******************************************");

  console.dir({ compileResult }, { depth: null });

  console.log("******************************************");

  if (compileResult.error) {
    console.log("******************************************");

    const context = [
      {
        role: `system`,
        content:
          `You are an experinced developer with great debugging skills.\n` +
          `You will write the full React component code, which should include all imports.` +
          `Just fix the bug that is reported don't make unnecessary changes to the code.\n` +
          `Your generated code will be directly written to a .tsx React component file and used in production.\n` +
          `Always return the code after modifying it and correcting the error. \n` +
          `Always output only tsx code, just reply with code and nothing else, pure code only surrounded by tsx blocks.`,
      },
      {
        role: `user`,
        content:
          `the generated code is not compiling, please fix it. Error message : \n\n` +
          "```\n" +
          compileResult.messages +
          "\n" +
          `here is the code` +
          generated_code +
          "\n```\n\n",
      },
    ];
    const gptPrompt = {
      model: process.env.OPENAI_MODEL,
      messages: context,
    };
    let completion = "";

    const stream = await openai.chat.completions.create({
      ...gptPrompt,
      stream: true,
    });

    for await (const part of stream) {
      process.stdout.write(part.choices[0]?.delta?.content || "");
      try {
        completion += part.choices[0]?.delta?.content || "";
      } catch (e) {
        false;
      }
    }
    let generated_code_itter = ``;
    let start = false;
    for (let l of completion.split("\n")) {
      let skip = false;
      if (
        l.trim() === "```" ||
        l.trim() === "tsx```" ||
        l.trim() === "```tsx"
      ) {
        start = !start;
        skip = true;
      }
      if (start && !skip) generated_code_itter += `${l}\n`;
    }
    generated_code_itter = generated_code_itter.trim();

    return await generated_codeVerify(generated_code_itter, counter + 1);
  }

  return {
    error: false,
    message: "code generation successful",
    generated_code: generated_code,
  };
}

async function new_component(query, req) {
  const context = [
    {
      role: `system`,
      content:
        `You are an experinced react devloper who can write code that satisfy all the coding standards and the UI you make is visually appealing.\n` +
        `Your task is to write a new React component for a web app, according to the provided task details.\n` +
        `If you judge it is relevant to do so, you can use library components and icons.\n\n` +
        `You will write the full React component code, which should include all imports.` +
        `Your generated code will be directly written to a .tsx React component file and used in production.`,
    },
    ...query.context,
    {
      role: `user`,
      content:
        `- COMPONENT NAME : ${query.task.name}\n\n` +
        `- COMPONENT DESCRIPTION :\n` +
        "```\n" +
        query.task.description.by_user +
        "\n```\n\n" +
        `- additional component suggestions :\n` +
        "```\n" +
        query.task.description.by_llm +
        "\n```\n\n\n" +
        "The full code of the new React component that you write will be written directly to a .tsx file inside the React project. Make sure all necessary imports are done, and that your full code is enclosed with tsx``` blocks. Answer with generated code only, DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. YOUR ANSWER CONTAINS CODE ONLY ! COMPONENT CODE ONLY !\n" +
        `Important :\n` +
        `- DO NOT USE LIBRARIES OR IMPORTS OUTSIDE OF WHAT IS PROVIDED IN THIS TASK; otherwise it would crash the component because not installed. DO NOT IMPORT EXTRA LIBRARIES BESIDES WHAT IS PROVIDED ABOVE!\n` +
        `- DO NOT HAVE ANY DYNAMIC DATA! Components are meant to be working as is without supplying any variable to them when importing them ! ONLY WRITE A COMPONENT THAT RENDER DIRECTLY WITH PLACEHOLDERS AS DATA, COMPONENT NOT SUPPLIED WITH ANY DYNAMIC DATA.\n` +
        `- Only write the code for the component; Do not write extra code to import it! The code will directly be stored in an individual React .tsx file !\n` +
        `Write the React component code as the creative genius and React component genius you are - with good ui formatting.\n`,
    },
  ];

  const gptPrompt = {
    model: process.env.OPENAI_MODEL,
    messages: context,
  };
  console.dir({
    context: context.map((e) => {
      return { role: e.role, content: e.content.slice(0, 200) + " ..." };
    }),
  });

  console.log("--------------------------------");
  const context_prompt_tokens = tiktokenEncoder.encode(
    context.map((e) => e.content).join("")
  ).length;
  console.log(
    `total context prompt tokens (estimate) : ${context_prompt_tokens}`
  );
  console.log("---------------------------------");

  let completion = "";
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || "");
    try {
      completion += part.choices[0]?.delta?.content || "";
    } catch (e) {
      false;
    }
  }

  let generated_code = ``;
  let start = false;
  for (let l of completion.split("\n")) {
    let skip = false;
    if (l.trim() === "```" || l.trim() === "tsx```" || l.trim() === "```tsx") {
      start = !start;
      skip = true;
    }
    if (start && !skip) generated_code += `${l}\n`;
  }
  generated_code = generated_code.trim();

  console.log("******************************************");
  console.dir({ generated_code }, { depth: null });
  const generated_code_copy = generated_code;

  // result structure will be {error: true, code: 'code', message: 'message'}
  const result = await generated_codeVerify(generated_code_copy, 0);

  console.log("******************************************");
  console.dir({ result }, { depth: null });

  if (!result.error) {
    fs.writeFileSync(
      `./generated/logs/generate_component/${Date.now()}.json`,
      JSON.stringify({
        task: query.task,
        context,
        completion,
      })
    );

    req.logger.info({
      task: query.task,
      context,
      completion,
      generated_code: result.generated_code
        ? result.generated_code
        : generated_code_copy,
    });

    return result;
  }
  return result;
}

async function iterate_component(query, req) {
  const context = [
    {
      role: `system`,
      content:
        `You are an expert at writing React components.\n` +
        `Your task is to write a new version of the provided React component for a web app, according to the provided task details.\n` +
        `If you judge it is relevant to do so, you can use library components and icons.\n\n` +
        `You will write the full React component code, which should include all imports.` +
        `Your generated code will be directly written to a .tsx React component file and used in production.`,
    },
    ...query.context,
    {
      role: `user`,
      content:
        `- COMPONENT NAME : ${query.task.name}\n\n` +
        `- COMPONENT DESCRIPTION :\n` +
        "```\n" +
        query.previous.description +
        "\n```\n\n" +
        `- CURRENT COMPONENT CODE :\n\n` +
        "```tsx\n" +
        query.previous.code +
        "\n```\n\n" +
        `- DESIRED COMPONENT UPDATES :\n\n` +
        "```tsx\n" +
        query.task.description.by_user +
        "\n```\n\n" +
        `- additional component update suggestions :\n` +
        "```\n" +
        query.task.description.by_llm +
        "\n```\n\n\n" +
        `Write the full code for the new, updated React web component \n` +
        "The full code of the new React component that you write will be written directly to a .tsx file inside the React project. Make sure all necessary imports are done, and that your full code is enclosed with ```tsx blocks. Answer with generated code only, DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. YOUR ANSWER CONTAINS CODE ONLY ! COMPONENT CODE ONLY !\n" +
        `Important :\n` +
        `- DO NOT USE LIBRARIES OR IMPORTS OUTSIDE OF WHAT IS PROVIDED IN THIS TASK; otherwise it would crash the component because not installed. DO NOT IMPORT EXTRA LIBRARIES BESIDES WHAT IS PROVIDED ABOVE!\n` +
        `- DO NOT HAVE ANY DYNAMIC DATA! Components are meant to be working as is without supplying any variable to them when importing them ! ONLY WRITE A COMPONENT THAT RENDER DIRECTLY WITH PLACEHOLDERS AS DATA, COMPONENT NOT SUPPLIED WITH ANY DYNAMIC DATA.\n` +
        `- Only write the code for the component; Do not write extra code to import it! The code will directly be stored in an individual React .tsx file !\n` +
        `Write the updated version of the React component code as the creative genius and React component genius you are - with good ui formatting.\n`,
    },
  ];

  const gptPrompt = {
    model: process.env.OPENAI_MODEL,
    messages: context,
  };
  console.dir({
    context: context.map((e) => {
      return { role: e.role, content: e.content.slice(0, 200) + " ..." };
    }),
  });

  console.log("---------------------------------");
  const context_prompt_tokens = tiktokenEncoder.encode(
    context.map((e) => e.content).join("")
  ).length;
  console.log(
    `total context prompt tokens (estimate) : ${context_prompt_tokens}`
  );
  console.log("---------------------------------");

  let completion = "";
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || "");
    try {
      completion += part.choices[0]?.delta?.content || "";
    } catch (e) {
      false;
    }
  }

  let generated_code = ``;
  let start = false;
  for (let l of completion.split("\n")) {
    let skip = false;
    if (l.trim() === "```" || l.trim() === "tsx```" || l.trim() === "```tsx") {
      start = !start;
      skip = true;
    }
    if (start && !skip) generated_code += `${l}\n`;
  }
  generated_code = generated_code.trim();

  console.log("******************************************");
  console.dir({ generated_code }, { depth: null });

  // result structure will be {error: true, code: 'code', message: 'message'}
  const result = await generated_codeVerify(generated_code, 0);

  if (!result.error) {
    fs.writeFileSync(
      `./generated/logs/generate_component/${Date.now()}.json`,
      JSON.stringify({
        task: query.task,
        context,
        completion,
      })
    );

    req.logger.info({
      task: query.task,
      context,
      completion,
      generated_code: result.generated_code,
    });

    return result;
  }
  return result;
}

module.exports = {
  new_component,
  iterate_component,
};
