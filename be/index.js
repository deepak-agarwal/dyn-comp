const express = require("express");
const cors = require("cors");
const axios = require("axios");
const winston = require("winston");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const dburi = "mongodb://root:example@localhost:27017/";
const dbclient = new MongoClient(dburi);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

const thirdPartyAuthEndpoint = "https://my-v2.gluestack.io/api/user";

function createRequestLogger(requestId, email) {
  const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: path.join(`logs/${email}`, `request-${requestId}.log`),
      }),
    ],
  });

  return logger;
}

const loggerCreate = (req, res, next) => {
  console.log("Request received", req.body, req.email);
  const requestId = uuidv4(); // Generate a unique ID for the request
  req.logger = createRequestLogger(requestId, req.email);
  req.logger.info({ message: "Request started", requestId });
  req.logger.info("[\n");
  next();
};

const generate = require(`./generate.js`);
const export_react = require(`./modules/export/react.js`);

async function authenticateAndLoginUser(req, res, next) {
  console.log("Authenticating user");
  // const token = req.header('Authorization')
  const email = "rohit99.ind@gmail.com";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const response = await axios.get(thirdPartyAuthEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = response?.data;
      if (data.email) {
        req.email = data.email;
        console.log("User authenticated", req.email);
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized: Authentication failed" });
      }
    } else {
      return res
        .status(response.status)
        .json({ message: "Authentication service error" });
    }
  } catch (error) {
    console.error("Authentication service error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function authenticateUser(req, res, next) {
  console.log("Authenticating user");
  // const token = req.header('Authorization')
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjU2MWNlOWJiNGRlMDM1M2NhNjM1NWY1ZGNiOWQ1MTZhZmJhZTdiMjBkODgyMmYyZTVhMzdmMDE1MjYzZWIwYjAxYzVjNzQ0YzA5YWExNTgiLCJpYXQiOjE3MDA2MzQwOTQuODcwOTkxLCJuYmYiOjE3MDA2MzQwOTQuODcwOTkyLCJleHAiOjE3MzIyNTY0OTQuODUwNjkxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.xbBxSHFJQESO36tqY9JqQOFTW1fiTpgXgEUnbcScooCDSBmMTJxjvpDWQ7IVYDhGNVNkwOg_27oaWtUX2UIUe7JGORtL6yMoE5Aa21DwZHhDNNBaR4VBwjvs7CMv1rg4hRbA9U-PWZZycXUbKois-8bAOr7fbuaOFCoYYrlsciS4T2W0JzmqSyZXgDZSQ07hsroz_DLrI_SJLQL_f3AXGpf2YUCjyPnUw_m4XKniDMNnlX-tdtX70xNdTOOSms6HdPJeTTfXlpCJ5m8f5t1wLBoMH-PFWj7eMf-GjX3dqC6oCQNLdoO12jc3j7cX3TKVoTv9yiLbrLQMSX9v9rSDA3Yl-5jExgiCNwZeoXrw-3xk2WH7244qtesClSfThd-C-vKOph2rGujRt9o1cXBHxN0E1SxVG4q3Ys6WaV55jXvCEWbIqbOB-VVgkELl1LQOyTN3YvtSzUVy9u16QQ0AwHAssMu9RTBtxDMYg_X5HoRVMXUCKbL0F7NyCTQQEE4m-tM2C_Vw-M4Xp0wcpdP0NF_PdMiOfcUEGaXXMEwDm86yL7z7wLOCnCeDCnfdJM4NBKCiQuz6gVpbUeQ6LD2xuLcSIT8SkTrfVrZQtzI1hxrKDpE0z-fSZ-B4DcN75dqirTL0212gEk5MnzD7rE94Rb4dgJ8ldENL7Drl-NtTPxg";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const response = await axios.get(thirdPartyAuthEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = response?.data;
      if (data.email) {
        req.email = data.email;
        console.log("User authenticated", req.email);
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized: Authentication failed" });
      }
    } else {
      return res
        .status(response.status)
        .json({ message: "Authentication service error" });
    }
  } catch (error) {
    console.error("Authentication service error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addPromptData(prompt, role, chatId, email) {
  if (typeof prompt === "object") {
    prompt = JSON.stringify(prompt);
  }
  const base64Prompt = Buffer.from(prompt).toString("base64");
  await prisma.prompt.create({
    data: {
      prompt: base64Prompt,
      role: role,
      Chat: {
        connectOrCreate: {
          where: {
            id: chatId,
          },
          create: {
            id: chatId,
            lastMessage: prompt,
            User: {
              connectOrCreate: {
                where: {
                  email: email,
                },
                create: {
                  email: email,
                  name: "Deepak",
                },
              },
            },
          },
        },
      },
    },
  });
}

async function fetchAllUserChatData(email) {
  let result = await prisma.user.findMany({
    where: {
      email: email,
    },
    include: {
      chats: {
        select: {
          id: true,
          lastMessage: true,
          prompts: true,
        },
      },
    },
  });
  return result;
}
async function fetchUserChatData(email, chatId) {
  let result = await prisma.chat.findMany({
    where: {
      id: chatId,
      User: {
        email: email,
      },
    },
    select: {
      id: true,
      lastMessage: true,
      prompts: true,
    },
  });
  // console.log("fetchUserChatData", email, chatId, result);
  return result;
}
app.post(`/component/new`, authenticateUser, loggerCreate, async (req, res) => {
  try {
    // Log the API call details
    req.logger.info({
      method: req.method,
      url: req.url,
      body: req.body,
      email: req.email,
    });

    const response = await generate.new_component(
      {
        query: req.body.query,
      },
      req
    );

    await addPromptData(
      req.body.query,
      "USER",
      response.componentId,
      req.email
    );
    await addPromptData(response, "LLM", response.componentId, req.email);

    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

app.post(
  `/component/iterate`,
  authenticateUser,
  loggerCreate,
  async (req, res) => {
    try {
      req.logger.info({
        method: req.method,
        url: req.url,
        body: req.body,
        email: req.email,
      });

      const response = await generate.iterate_component(
        {
          componentId: req.body.componentId,
          query: req.body.query,
          name: req.body.name,
          initialPrompt: req.body.initialPrompt,
          code: req.body.code,
        },
        req
      );

      await addPromptData(
        req.body.query,
        "USER",
        req.body.componentId,
        req.email
      ); // store the query in the db when user sends a query.
      await addPromptData(response, "LLM", req.body.componentId, req.email); // store the generated code in the db when user sends a query.
      let result = await fetchUserChatData(req.email, response.componentId);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(`/component/ping`, async (req, res) => {
  console.dir({
    ping: `received ping from webapp; components loaded successfully :)`,
    ...req.query,
  });
  EXPORT_PING_STATUS = true;
  res.json({ status: true });
});

app.post(`/getchats`, authenticateUser, loggerCreate, async (req, res) => {
  req.logger.info({
    method: req.method,
    url: req.url,
    body: req.body,
    email: req.email,
  });
  // console.log("req.body", req.email);
  const response = await fetchAllUserChatData(req.email);
  res.json(response);
});
app.post(`/getchat`, authenticateUser, loggerCreate, async (req, res) => {
  req.logger.info({
    method: req.method,
    url: req.url,
    body: req.body,
    email: req.email,
  });
  // console.log("req.body", req.email);
  const response = await fetchUserChatData(req.email, req.body.chatId);
  res.json(response);
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port} --------------------\n`);
  // export_react.dump_webapp({ email: `deepaka@geekyants.com` });
});
