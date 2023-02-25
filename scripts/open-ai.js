const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

extractCatchyTitle()
// extractKeywords()

async function extractCatchyTitle() {
  const content = 'There are three themes we are overweight on. First, we are extremely positive on the capex cycle currently ensuing in India, driven by the private sector. The second area that we are overweight on is basically going bottom up in the real estate sector.'

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    "prompt": `Extract creative title from this text:\n\n${content}`,
  });

  const titleText = response.data && response.data.choices ? response.data.choices : 'no-result'
  console.log(titleText)
}


async function extractKeywords() {
  const content = 'There are three themes we are overweight on. First, we are extremely positive on the capex cycle currently ensuing in India, driven by the private sector. The second area that we are overweight on is basically going bottom up in the real estate sector.'

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    "prompt": `Extract keywords from this text:\n\n${content}`,
  });

  const keywords = response.data && response.data.choices ? response.data.choices[0].text : 'real-estate'
  console.log(keywords)
}
