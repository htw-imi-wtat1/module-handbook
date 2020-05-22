module.exports = {
  dateFormFormat: dateFormFormat,
  dateViewFormat: dateViewFormat
}
function dateFormFormat (date) {
  const realDate = (typeof date) === 'string' ? new Date(date) : date
  return realDate.toISOString().substring(0, 10)
}
function dateViewFormat (date) {
  return dateFormFormat(date)
}
