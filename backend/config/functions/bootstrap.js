// module.exports = async () => {
//   // Register your custom department model
//   strapi.db.setModel('department', require('../api/models/department'));

//   // Register your custom department API
//   strapi.router.get('/departments', strapi.controllers.department.find);
//   strapi.router.get('/departments/:id', strapi.controllers.department.findOne);
//   strapi.router.post('/departments', strapi.controllers.department.create);
//   strapi.router.put('/departments/:id', strapi.controllers.department.update);
//   strapi.router.delete('/departments/:id', strapi.controllers.department.delete);
// };
