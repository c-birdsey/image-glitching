const { Model } = require('objection');

const Image = require('./Image');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['googleId'],
      properties: {
        id: { type: 'integer' },
        googleId: { type: 'string' },
        givenName: { type: 'string' },
        familyName: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: 'User.id',
          to: 'Image.createdBy'
        }
      }
    };
  }
}

module.exports = User;
