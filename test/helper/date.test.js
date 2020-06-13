const { dateFormFormat } = require('../../app/helper/date')

describe('dateViewFormat', () => {
  it('formats date', () => {
    expect(dateFormFormat(new Date('2020-05-20'))).toBe('2020-05-20')
  })
  it('formats string', () => {
    expect(dateFormFormat('2020-05-20')).toBe('2020-05-20')
  })
})
