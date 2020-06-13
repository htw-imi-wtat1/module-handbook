const repl = require('repl')
const replServer = repl.start({
  prompt: '> '
})
replServer.context.name = 'Module Handbook'
const mongodbURI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')
const mongoose = require('mongoose')
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
replServer.context.mongoose = mongoose
replServer.context.db = mongoose.connection

replServer.context.User = require('./app/models/user')
replServer.context.Course = require('./app/models/course')
const { logEntrySchema, LogEntry } = require('./app/models/logEntry')
replServer.context.logEntrySchema = logEntrySchema
replServer.context.LogEntry = LogEntry
replServer.context.params = {
  course: 'M08',
  event: 'passed',
  date: '2020-09-01',
  semester: 12,
  notes: 'finally'
}
replServer.context.userId = '5ec66f095352408d71212cac'
replServer.context.logEntryId = '5ec704088b8cd0b203587487'
