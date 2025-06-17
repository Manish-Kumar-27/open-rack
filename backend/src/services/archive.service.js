const axios = require("axios");

exports.searchArchiveBooks = async (query) => {
  const apiUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
    query
  )}+AND+mediatype%3Atexts&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=year&fl[]=language&rows=10&page=1&output=json`;

  const { data } = await axios.get(apiUrl);
  const docs = data.response?.docs || [];

  return docs.map((doc) => {
    const identifier = doc.identifier;
    return {
      title: doc.title,
      author: doc.creator,
      year: doc.year,
      language: doc.language,
      readUrl: `https://archive.org/details/${identifier}`,
      coverUrl: `https://archive.org/services/img/${identifier}`,
      downloadUrl: `https://archive.org/download/${identifier}/${identifier}.pdf`, // not guaranteed
    };
  });
};
