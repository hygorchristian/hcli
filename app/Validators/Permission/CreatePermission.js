'use strict'

class CreatePermission {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      slug: 'required',
      name: 'required',
      description: 'required',
    }
  }
}

module.exports = CreatePermission
