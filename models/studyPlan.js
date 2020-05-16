const mongoose = require('mongoose')
const studyPlanSchema = mongoose.Schema({
  semester: Number,
  status: { type: String, enum: ['new', 'planned', 'enrolled', 'passed'] },
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' }
  // subscribedAccount: { type: Schema.Types.ObjectId, ref: 'Subscriber' },

  // courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})
module.exports = mongoose.model('StudyPlan', studyPlanSchema)
