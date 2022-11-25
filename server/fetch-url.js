const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

const requiredProperties = [
  "og:title",
  "og:description",
  "og:image",
  "og:site_name",
];

const fetchAndParseURL = async (url) => {
  console.log(url);
  try {
    const response = await fetch(url);
    const responseText = await response.text();
    const $ = cheerio.load(responseText);

    /// parsing html

    const documentTitle = $("head > title").text();
    const returnVals = {};
    const metas = $("meta")
      .toArray()
      .forEach((elem) => {
        const attribVals = elem.attribs;
        if (
          attribVals.property &&
          requiredProperties.includes(attribVals.property)
        ) {
          returnVals[attribVals.property] = attribVals.content;
        }
      });
    return returnVals;
  } catch (err) {
    throw new Error(err);
  }
};

// fetchAndParseURL(
//   "https://soundcloud.com/discover/sets/picks-for-you::abhi-patel-19"
// );

module.exports = {
  fetchAndParseURL: fetchAndParseURL,
};
