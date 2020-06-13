'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const logEntrySchema = mongoose.Schema(
  {
    semester: Number,
    event: { type: String, enum: ['new', 'planned', 'enrolled', 'failed', 'passed'] },
    notes: String,
    course: String,
    date: Date
  }, {
    timestamps: true
  })

module.exports = {
  logEntrySchema: logEntrySchema,
  LogEntry: mongoose.model('LogEntry', logEntrySchema)
}
