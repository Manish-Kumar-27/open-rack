const axios = require("axios");
const cheerio = require("cheerio");

exports.searchGutenbergBooks = async (query) => {
  const url = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const books = [];

  $("li.booklink").each((i, el) => {
    const title = $(el).find("span.title").text().trim();
    const author = $(el).find("span.subtitle").text().trim();
    const id = $(el).find("a.link").attr("href")?.split("/")[2];

    if (id && title) {
      books.push({
        title,
        author,
        format: "EPUB", // We’ll assume EPUB + HTML available
        readUrl: `https://www.gutenberg.org/ebooks/${id}`,
        downloadUrl: `https://www.gutenberg.org/ebooks/${id}.epub.images`,
        source: "ProjectGutenberg",
      });
    }
  });

  return books;
};
