'use strict'

// has to be PORT to work on heroku!
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30020 : 3002)

const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')
const mongoose = require('mongoose')
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!')
})

const app = require('./app')
app.set('port', port)

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})
