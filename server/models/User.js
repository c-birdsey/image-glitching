const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  // fields to return on authentication
  authDetails() {
    return {
      username: this.username,
      token: this.token
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'email'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string' },
        email: { type: 'string' },
        token: { type: 'text' }
      }
    };
  }
}

module.exports = User;
