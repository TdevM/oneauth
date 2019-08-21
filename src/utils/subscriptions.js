const request = require('request')
const { 
  EventSubscription,
  Client
} = require('../db/models').models

async function getSubscriptions(model, type) {
  return EventSubscription.findAll({
    where: {
      model,
      type
    }
  })
}

function sendEvent(subscriptions, model, type, id, userId) {
  return Promise.all(subscriptions.map(async subscription => {
    const client = await Client.findById(subscription.clientId)
    const webhookURL = client.webhookURL
    if (webhookURL &&
        webhookURL.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    ) {
      return request.post({
        url:webhookURL,
        body:{
          type,
          model,
          success: 'true',
          id,
          userId
        },
        headers: {
          'clientId': client.get().id,
          'secret': client.get().secret
        },
        json: true
      })
    }
  }))
}

module.exports = {
  getSubscriptions,
  sendEvent
}
