const axios = require('axios')

const API_URL = 'https://api.placid.app/api/rest/'

const TEMPLATES = {
  sm_post_1: 'orgurvojb',
  sm_post_2: 'iv8s8mrxw',
  sm_post_3: 'zgdzkzjyw',
  podcast: 'uezgj3by8',
}

createWebBanner()

async function createWebBanner() {
  const data = {
    webhook_success: "https://klnq38lwqj.execute-api.ap-south-1.amazonaws.com/dev/api/placid-webhook",
    layers: {
      "Banner_Image": {
        "image": "https://images.moneycontrol.com/static-mcnews/2023/02/Three-C-580x435.jpg"
      },
      "Heading": {
        "text": "Delhi court issues NBW against one of the promotors of Greenopolis in Gurugram"
      },
      // "cta-text": {
      //   "text": "Read Now"
      // },
      // "cta-bg": {
      //   "image": "picture"
      // },
      // "Logo": {
      //   "image": "picture"
      // },
    },
  }

  createImage(TEMPLATES.sm_post_2, data)
}

function createPodcastImage() {
  const data = {
    "layers": {
      "webinar-tagline": {
        "text": "Podcast Ep 1 • 20th Feb, 2023",
      },
      "webinar-title": {
        text: "What the Budget 2023 announcement means for you",
      },
      "speaker-img": {
        image: "https://pbs.twimg.com/profile_images/1519209258465726464/5lU4xcnT_400x400.jpg",
      },
      "speaker-name": {
        text: "Anuj Puri",
      },
      "speaker-position": {
        text: "Chairman, Anarock",
      },
    }
  }

  createImage('uezgj3by8', data)
}

async function createImage(templateId, data) {
  try {
    const res = await axios.post(
      `${API_URL}${templateId}`,
      {
        ...data,
      },
      {
        headers: {
          "Authorization": "Bearer placid-ntrr5xv0uh4rkpu8-cncyzkdzw3e9oqvg",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    )

    console.log(res.data)
  } catch (err) {
    console.log(err.response.data)
  }
}