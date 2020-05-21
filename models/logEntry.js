'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const logEntrySchema = mongoose.Schema(
  {
    semester: Number,
    event: { type: String, enum: ['new', 'planned', 'enrolled', 'passed'] },
    notes: String,
    course: String,
    date: Date
  }, {
    timestamps: true
  })
// module.exports = mongoose.model('LogEntry', logEntrySchema)
// this is a subschema - just export the schema
module.exports = logEntrySchema
