'use strict'

const Message = require('../models/message')

module.exports = io => {
  io.on('connection', client => {
    Message.find({})
      .sort({
        createdAt: -1
      })
      .limit(10)
      .then(messages => {
        client.emit('load all messages', messages.reverse())
      })

    console.log('new connection')

    client.on('disconnect', () => {
      console.log('user disconnected')
    })

    client.on('message', data => {
      const messageAttributes = {
        content: data.content,
        userName: data.userName,
        user: data.userId
      }
      const m = new Message(messageAttributes)
      m.save()
        .then(() => {
          io.emit('message', messageAttributes)
          console.log('message broadcasted:' + messageAttributes.content)
        })
        .catch(error => console.log(`error: ${error.message}`))
    })
  })
}
