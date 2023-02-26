const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB.DocumentClient()

const TABLES = {
  RESHORTS: 'reshorts',
}

// for development environment
// if (process.env.ENV === 'dev') {
//   TABLES.FORM_ENTRIES = TABLES.TEST
// }

const getMemberItem = (params) => {
  return dynamo.get({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const queryMemberItems = (params) => {
  return dynamo.query({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const getFormEntry = (params) => {
  return dynamo.get({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const putFormEntry = (params) => {
  return dynamo.put({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const updateFormEntry = (params) => {
  return dynamo.update({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const queryPathshalaStats = (params) => {
  return dynamo.query({
    TableName: TABLES.RESHORTS,
    ...params,
  })
}

const generateUpdateQuery = (fields) => {
  let exp = {
    UpdateExpression: 'set',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  }

  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += ` #${key} = :${key},`
    exp.ExpressionAttributeNames[`#${key}`] = key
    exp.ExpressionAttributeValues[`:${key}`] = item
  })

  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1)

  return exp
}

module.exports = {
  dynamo,
  TABLES,
  getMemberItem,
  queryMemberItems,
  getFormEntry,
  putFormEntry,
  updateFormEntry,
  queryPathshalaStats,
  generateUpdateQuery,
}
