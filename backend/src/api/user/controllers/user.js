const jwt = require('jsonwebtoken');

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      email: identifier,
    });

    if (!user) {
      return ctx.badRequest('Invalid credentials');
    }

    const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
      password,
      user.password
    );

    if (!validPassword) {
      return ctx.badRequest('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return {
      jwt: token,
    };
  },
};