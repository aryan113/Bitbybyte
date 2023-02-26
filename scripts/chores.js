const AWS = require('aws-sdk')
const _ = require('lodash')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

// AWS.config.update({ region: 'ap-south-1' })
const dynamo = new AWS.DynamoDB.DocumentClient()

const TABLES = {
  RESHORTS: 'reshorts',
}

const scanQuery = {
  TableName: TABLES.RESHORTS,
  ExpressionAttributeNames: {
    '#st': 'state',
    '#june': 'june',
    '#july': 'july',
    '#aug': 'aug',
    '#sept': 'sept',
    '#oct': 'oct',
    '#nov': 'nov',
    '#dec': 'dec',
    '#attend': 'attend',
    '#gatha': 'gatha',
    '#updatedAt': 'updatedAt',
  },
  ProjectionExpression:
    'pk, gender, #st, district, is_book_received, order_status, payment_mode, payment_type, amount, trans_date, del_status, #june.#attend, #june.#gatha, #june.#updatedAt, #july.#attend, #july.#gatha, #july.#updatedAt, #aug.#attend, #aug.#gatha, #aug.#updatedAt, #sept.#attend, #sept.#gatha, #sept.#updatedAt, #oct.#attend, #oct.#gatha, #oct.#updatedAt, #nov.#attend, #nov.#gatha, #nov.#updatedAt, #dec.#attend, #dec.#gatha, #dec.#updatedAt',
  Limit: 10000,
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const entries = await scanDynamoDB(scanQuery, [])

    console.log('running updateStats', entries.length)

    // await updateStats(entries)

    console.log('updateStats complete')
  } catch (err) {
    console.log('chores function error:', err)
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify('scanDynamoDB complete!'),
  }
};
