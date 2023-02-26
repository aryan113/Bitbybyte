const axios = require('axios');
const Airtable = require('airtable');
const { Configuration, OpenAIApi } = require("openai");
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const configuration = new Configuration({
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

const base = new Airtable({ apiKey: 'key8Fd9wPmEeVMGCJ' }).base('appYuNzt3cbw4NeEQ');

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const PLACID_API_URL = 'https://api.placid.app/api/rest/';

const PLACID_TEMPLATES = {
  sm_post_1: 'urqp4sgpc', // 1
  sm_post_2: 't9n9qjjle', // 5
  sm_post_3: 'orypskfvj', // 6
  guide: 'e02l6goah', // 4
  sm_post_9: 'zgdzkzjyw', // 3
  podcast: 'uezgj3by8',
}

const fetchNews = async (req, res) => {
  try {
    const { from, to } = req.body

    const newsResponse = await axios.get(
      `${NEWS_API_URL}`,
      {
        params: {
          "apiKey": "2ad70e4a1c7e421f811ed9e2f99974d5",
          "domains": "moneycontrol.com,indiatimes.com,thehindu.com,hindustantimes.com,ndtv.com",
          "from": from || "2023-02-24T10:00:00",
          "to": to || "2023-02-26T05:00:00",
          "q": "real estate",
          "pageSize": 10,
          "sortBy": "popularity",
        },
      },
    );

    console.log(newsResponse.data.articles.length);

    const promisesForPosts = newsResponse.data.articles.map(async newsArticle => {
      return optimisePost(newsArticle)
    })

    const posts = await Promise.all(promisesForPosts)

    console.log(posts)

    const airtableRecords = await createAirtablePosts(posts)

    const promisesForImages = airtableRecords.map(async record => {
      return createPlacidImage(record)
    })

    const images = await Promise.all(promisesForImages)

    console.log(images)

    return res.status(200).json({ body: JSON.stringify('ReporterBot job complete!'), })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      errorCode: 'SERVER_ERROR',
      message: `It's server error, not yours. Please try again in sometime.`,
    })
  }
}

function optimisePost(obj) {
  return new Promise(async (resolve, reject) => {
    const keywords = await createKeywords(`\n${obj.title}\n\n${obj.description}\n\n${obj.content}`);

    const newData = {
      fields: {
        "title": obj.title,
        "caption": keywords,
        "link": obj.url,
        "content": obj.description,
        "type": "post",
        "content-type": "text",
        "updated_at": dayjs(obj.publishedAt).format('YYYY-MM-DD') || "2023-02-24",
        "background": obj.urlToImage,
        "image": obj.urlToImage,
        "source": obj.source.name,
        "status": "in-process",
      }
    }

    resolve(newData)
  })
}

function createAirtablePosts(posts) {
  return new Promise((resolve, reject) => {
    base('drafts').create([...posts], (err, records) => {
      if (err) {
        console.error(err);
        reject(err)
      }

      records.forEach(function (record) {
        console.log(record.getId());
      });

      resolve(records)
    })
  })
}

function createPlacidImage(record) {
  return new Promise(async (resolve, reject) => {
    try {
      const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      const templateName = `sm_post_${random}`;
      const templateId = PLACID_TEMPLATES[templateName] || PLACID_TEMPLATES.sm_post_1;

      const res = await axios.post(
        `${PLACID_API_URL}${templateId}`,
        {
          passthrough: record.id,
          layers: {
            "Banner_Image": {
              "image": record.fields.image
            },
            "Heading": {
              "text": record.fields.title
            },
          },
          webhook_success: "https://klnq38lwqj.execute-api.ap-south-1.amazonaws.com/dev/api/placid-webhook"
        },
        {
          headers: {
            "Authorization": "Bearer placid-ntrr5xv0uh4rkpu8-cncyzkdzw3e9oqvg",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )

      console.log(res.data)
      resolve(res.data)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

function createCatchyTitle(content) {
  return new Promise(async (resolve, reject) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      "prompt": `write catchy title for:\n\n${content}`,
    });

    const titleText = response.data && response.data.choices ? response.data.choices[0].text : 'Read Now'
    console.log(response.data.choices)

    resolve(titleText.trim())
  })
}


function createKeywords(content) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        "prompt": `extract keywords from this text:\n\n${content}`,
      });

      const keywords = response.data && response.data.choices ? response.data.choices[0].text : 'Short Real Estate News'
      console.log(response.data.choices)

      resolve(keywords.trim())
    } catch (error) {
      resolve(null)
    }
  })
}


module.exports = {
  fetchNews,
}
