const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

const content = `In the wake of a scam that saw hundreds of homebuyers duped by real estate developers, who allegedly sold apartments for crores with the help of fake documents, the Maharashtra government has directed all Municipal Corporation and Municipal Councils, including local authorities in towns to take action.

The local bodies have been ordered to upload documents of permission given to all real estate developers on their website, and integrate this data with the website of real estate regulatory body Maharashtra Real Estate Regulatory Authority (MahaRERA).

Background

In 2022, more than 60 projects near Mumbai that were constructed based on fake documents were blacklisted. All the projects are located within 50 to 150 km of Mumbai in the Kalyan Dombivali Municipal Corporation (KDMC) jurisdiction, which is part of the Mumbai Metropolitan Region (MMR).

Over 60 developers are being investigated for allegedly submitting fake permission documents to obtain RERA registration.

What now?

The Urban development department (UDD) of Maharashtra has directed all municipal corporations, councils, and local authorities in towns to develop a system wherein all relevant permissions for real estate projects, including commencement certificates (CC) and occupation certificates (OC), are available online.

In a government resolution issued on February 23, the UDD has asked all the corporations and councils to develop a website, if one does not already exist, and ensure that all data regarding permissions given to real estate developers is published on the website, for the public.

The government has also directed the authorities to integrate their websites with that of the Maharashtra Real Estate Regulatory Authority (MahaRERA), to ensure all the information is available and potential homebuyers are not cheated. The deadline for the local authorities to upload and integrate data with the MahaRERA website is March 31, 2023.

The case

According to the Kalyan Dombivali Municipal Corporation (KDMC) in the Mumbai Metropolitan Region, the accused developers had allegedly cheated homebuyers from 27 villages by forging documents. The forgeries appeared to show permission for the construction of houses had been issued by the KDMC, and were used to register the projects under RERA.

The developers indulged in the fraud between 2017 and 2022, and home buyers shelled out Rs 25 lakh to Rs 35 lakh for each of the tenements constructed by these developers, according to KDMC.

Following this, MahaRERA began suo motu hearings and announced that it would approach the Urban Development Department of Maharashtra to immediately put in place a system wherein all milestone approvals relevant to buyers / purchasers of real estate projects, such as Commencement Certificates and Occupation Certificates, are put on a dedicated portal by the respective planning authority.

This is to ensure that the certificates can be verified by the buyers / purchasers of real estate projects, MahaRERA had said.`

extractCatchyTitle()
extractKeywords()


async function extractCatchyTitle() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    "prompt": `write catchy title for:\n\n${content}`,
  });

  const titleText = response.data && response.data.choices ? response.data.choices[0].text : 'no-result'
  console.log('')
  console.log(titleText.trim())
}


async function extractKeywords() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    "prompt": `write instagram caption for:\n\n${content}`,
  });

  const caption = response.data && response.data.choices ? response.data.choices[0].text : 'real-estate'
  console.log(caption.trim())
}
