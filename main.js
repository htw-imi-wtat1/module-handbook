'use strict'

// has to be PORT to work on heroku!
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30020 : 3002)
const mongoose = require('mongoose')

if (process.env.CYPRESS_TEST_RUN) {
  console.log('CYPRESS_TEST_RUN') // export set CYPRESS_TEST_RUN=true
  const { MongoMemoryServer } = require('mongodb-memory-server')

  const mongoServer = new MongoMemoryServer()

  mongoServer.getUri().then((mongoUri) => {
    console.log(mongoUri)
    const mongooseOpts = {
      // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useMongoClient: true // remove this line if you use mongoose 5 and above
    }

    mongoose.connect(mongoUri, mongooseOpts)

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e)
        mongoose.connect(mongoUri, mongooseOpts)
      }
      console.log(e)
    })

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`)
    })
  })
} else {
  const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')

  mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!')
  })
}
const app = require('./app/app')
app.set('port', port)

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})
