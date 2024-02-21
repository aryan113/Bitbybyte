const axios = require("axios");

const API_URL = "https://newsapi.org/v2/everything";


// https://newsapi.org/v2/everything?domains=moneycontrol.com,indiatimes.com&from=2023-02-18&apiKey=2ad70e4a1c7e421f811ed9e2f99974d5&q=real estate

init()

async function init(context) {
  try {
    const text = await fetchNews();

    // push to firestore

    return text;
  } catch (error) {
    console.error("handler error: ", error);
    return null;
  }
};

async function fetchNews() {
  try {
    const res = await axios.get(
      `${API_URL}`,
      {
        params: {
          "apiKey": "2ad70e4a1c7e421f811ed9e2f99974d5",
          "domains": "moneycontrol.com,indiatimes.com,thehindu.com,hindustantimes.com,ndtv.com",
          "from": "2024-02-24T10:00:00",
          "q": "real estate",
          "sortBy": "popularity"
        },
      },
    );

    console.log(res.data.articles.length, res.data.articles[0]);
    return res.data.articles[0];
  } catch (err) {
    console.log(err);
  }
};
