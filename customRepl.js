const repl = require('repl')
const replServer = repl.start({
  prompt: '> '
})
replServer.context.name = 'Module Handbook'
const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')
const mongoose = require('mongoose')
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = global.Promise
replServer.context.mongoose = mongoose
replServer.context.db = mongoose.connection
replServer.context.User = require('./models/user')
replServer.context.Course = require('./models/course')
replServer.context.logEntrySchema = require('./models/logEntry')
