const stateClassMapping = {
  new: 'table-light',
  planned: 'table-info',
  enrolled: 'table-warning',
  passed: 'table-success',
  failed: 'table-danger'
}

module.exports = {
  classForState: (state) => stateClassMapping[state]
}
