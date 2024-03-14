const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(bodyParser.json());

const port = 3333;
const indexName = "bank-index";
const esHost = "https://localhost:9200";
const esUserName = "elastic";
const esPassword = "hwdUCN+*nsr1riiBqjzT";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(" \n");
  console.log(`Get all :  http://localhost:${port}/search`);
});

const client = new Client({
  node: esHost,
  auth: {
    username: esUserName,
    password: esPassword,
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

app.locals.elasticClient = client; // Make the client accessible throughout the app
console.log("Connected to Elasticsearch");

// curl -X GET -H "Content-Type: application/json"  http://localhost:3333/search
app.get("/search", async (req, res) => {
  try {
    const response = await req.app.locals.elasticClient.search({
      index: indexName,
    });
    const sources = response.hits.hits.map((hit) => hit._source);
    res.json(sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// curl "http://localhost:3333/find?q=Elinor"
app.get('/find', async (req, res) => {
    try {
      const { q } = req.query;
      const response = await req.app.locals.elasticClient.search({
        index: indexName,
        body: {
          query: {
            query_string: {
              query: q,
              default_field: "*" // Search across all fields
            },
          },
        },
      });
      res.json(response.hits.hits.map(hit => hit._source)); // Return only the _source part
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// curl -X POST -H "Content-Type: application/json" -d '{"title": "Sample Document", "content": "This is a test document."}' http://localhost:3333/index

// app.post("/index", async (req, res) => {
//   try {
//     const { body } = req;
//     const response = await req.app.locals.elasticClient.index({
//       index: "indexName",
//       body,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
