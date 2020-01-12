const { test, trait, before, after } = use('Test/Suite')('Permission')

const User = use('App/Models/User')
const Permission = use('App/Models/Permission')

trait('Test/ApiClient')
trait('Auth/Client')

const mock = {
  user: {
    email: 'teste@teste.com',
    username: 'tester',
    password: '123456',
  },
}

before(async () => {
  await User.create(mock.user)

  for (let i = 0; i < 5; i++) {
    await Permission.create({
      slug: 'teste' + 1,
      name: 'teste' + 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.' + 1,
    })
  }
})

after(async () => {
  const user = await User.findByOrFail('email', mock.user.email)
  await user.delete()
})

test('Create permission', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)
  const data = {
    slug: 'teste',
    name: 'teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
  }

  const response = await client
    .post('/permissions')
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    slug: 'teste',
    name: 'teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
  })
})

test('Get one permission', async ({ client }) => {
  const response = await client
    .get('/permissions/1')
    .end()

  response.assertStatus(200)
})

test('Get all permissions', async ({ client }) => {
  const response = await client
    .get('/permissions')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset([{
    data: {
      slug: 'teste',
      name: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta egestas laoreet. Ut in ligula quis risus ultrices interdum.',
    }
  }])
})

test('Update permission', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)
  const data = {
    slug: 'teste-update',
    name: 'teste-update',
    description: 'Nam mollis, leo eu lacinia venenatis, sapien elit elementum sapien, non sollicitudin augue arcu ac urna. Maecenas et convallis neque.',
  }

  const response = await client
    .put(`/permissions/1`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    slug: data.slug
  })
})

test('Delete permission', async ({ client }) => {
  const user = await User.findByOrFail('email', mock.user.email)

  const response = await client
    .delete(`/permissions/1`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
})
