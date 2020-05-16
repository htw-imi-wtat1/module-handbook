const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studyPlanSchema = mongoose.Schema({
  semester: Number,
  status: { type: String, enum: ['new', 'planned', 'enrolled', 'passed'] },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  studyPlan: { type: Schema.Types.ObjectId, ref: 'StudyPlan' }
  // subscribedAccount: { type: Schema.Types.ObjectId, ref: 'Subscriber' },

  // courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})
module.exports = mongoose.model('StudyPlan', studyPlanSchema)
