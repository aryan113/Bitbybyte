const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'patwXzkI0ezdZsVSg.52b54dda6e51b05c2c25129f348b03f8397728ac6fa9a6c8d8757fd857126a5c' }).base('appYuNzt3cbw4NeEQ');

const handler = async (req, res) => {
  try {
    console.log(req.body)

    const { passthrough, image_url } = req.body

    if (!passthrough) {
      return res.status(200)
    }

    await updateAirtablePost({
      id: passthrough,
      fields: {
        image: image_url,
        status: 'in-review',
      }
    })

    console.log(image_url)

    return res.status(200).json({ body: JSON.stringify('Webhook handled.'), })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      errorCode: 'SERVER_ERROR',
      message: `It's server error, not yours. Please try again in sometime.`,
    })
  }
}

function updateAirtablePost(data) {
  return new Promise((resolve, reject) => {
    base('drafts').update([{ ...data }], function (err) {
      if (err) {
        console.error(err);
        reject(err)
      }

      resolve()
    })
  })
}

module.exports = {
  handler,
}
