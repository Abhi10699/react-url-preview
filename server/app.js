const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const { fetchAndParseURL } = require("./fetch-url");
const cors = require('cors');

const PORT = 4000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.post("/fetch/", async (req, res, next) => {
  const url = req.body.url;
  console.log(req.body);
  if (!url) {
    res.status(401).json({ message: "No URL In Request Body" });
  } else {
    try {
      const parsedTags = await fetchAndParseURL(req.body.url);
      res.status(200).json({ url: req.body.url, parsedTags });
    } catch (err) {
      next(err);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
