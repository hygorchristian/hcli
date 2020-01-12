const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Permission
|--------------------------------------------------------------------------
|
| Routes for the Permission resource
|
*/

Route.post('/permissions', 'PermissionController.store').validator('Permission/CreatePermission').middleware(['auth'])
Route.get('/permissions', 'PermissionController.index')
Route.get('/permissions/:id', 'PermissionController.show')
Route.put('/permissions/:id', 'PermissionController.update').validator('Permission/UpdatePermission').middleware(['auth'])
Route.delete('/permissions/:id', 'PermissionController.destroy').middleware(['auth'])
