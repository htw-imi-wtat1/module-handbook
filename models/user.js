'use strict'

const mongoose = require('mongoose')
const { Schema } = require('mongoose')
// const Subscriber = require('./subscriber')
const { logEntrySchema } = require('./logEntry')

var userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, 'Zip code too short'],
      max: 99999
    },
    password: {
      type: String,
      required: true
    },
    logBook: [logEntrySchema]
  },
  {
    timestamps: true
  }
)

userSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`
})

module.exports = mongoose.model('User', userSchema)
