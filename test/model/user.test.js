const logEntrySchema = require('../../models/logEntry')
describe('event enum', () => {
  it('list enum values', () => {
    expect(logEntrySchema.path('event').enumValues).toStrictEqual([
      'new',
      'planned',
      'enrolled',
      'passed'
    ])
  })
})
