'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const logEntrySchema = mongoose.Schema({
  semester: Number,
  status: { type: String, enum: ['new', 'planned', 'enrolled', 'passed'] },
  notes: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  logBook: { type: Schema.Types.ObjectId, ref: 'LogBook' }
})
// module.exports = mongoose.model('LogEntry', logEntrySchema)
// this is a subschema - just export the schema
module.exports = logEntrySchema
