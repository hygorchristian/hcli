'use strict'

const Permission = use('App/Models/Permission')

class PermissionController {
  async index ({ request }) {
    const {
      page = 1,
      perPage = 10,
      sort = 'created_at',
      order = 'ASC'
    } = request.get()

    const query = Permission.query().orderBy(sort, order)
    const permissions = await query.paginate(page, perPage)
    return permissions
  }

  async show ({ params }) {
    const permission = await Permission.findOrFail(params.id)
    return permission
  }

  async store ({ request }) {
    const data = request.only([
      'slug', 
      'name', 
      'description', 
    ])

    const permission = await Permission.create(data)

    return permission
  }

  async update ({ params, request }) {
    const permission = await Permission.findOrFail(params.id)
    const data = request.only([
      'slug', 
      'name', 
      'description', 
    ])

    permission.merge(data)

    await permission.save()

    return permission
  }

  async destroy ({ params }) {
    const permission = await Permission.findOrFail(params.id)
    permission.delete()
  }
}

module.exports = PermissionController
