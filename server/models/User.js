const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      requred: ['googleId'],
      properties: {
        id: { type: 'integer' },
        googleId: { type: 'string' },
        givenName: { type: 'string' },
        familyName: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }
}

module.exports = User;
