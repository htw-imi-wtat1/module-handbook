'use strict'
const { app, User, request, id } = require('../commonJest')

const LogBook = require('../../models/logBook')
describe('logBook user association', () => {
  let user
  let logBook
  beforeEach(async () => {
    user = await User.create({ name: { first: 'Trick' }, email: `email8${id()}@somehost.de`, password: 'geheim12' })
    logBook = await LogBook.create({ student: user.id })
  })
  it('logbook to user returns Object id', async (done) => {
    expect(typeof logBook.student).toBe('object')
    expect(logBook.student.toString()).toStrictEqual(user.id)
    done()
  })
  it('logbook to user', async (done) => {
    expect(typeof logBook.student).toBe('object')
    const linkedUser = await User.findById(logBook.student)
    expect(linkedUser.id).toStrictEqual(user.id)
    done()
  })
  it('find logbook', async () => {
    const linkedLogBook = await LogBook.findOne({ student: user.id })
    expect(linkedLogBook.id).toStrictEqual(logBook.id)
  })
  it('user to logbook', async () => {
    const lb = await user.getLogBook
    expect(lb.id).toStrictEqual(logBook.id)
  })
})
