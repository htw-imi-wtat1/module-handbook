'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const logBookSchema = mongoose.Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  entries: [{ type: Schema.Types.ObjectId, ref: 'LogEntry' }]
})
module.exports = mongoose.model('LogBook', logBookSchema)
