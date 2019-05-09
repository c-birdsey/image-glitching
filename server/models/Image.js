const { Model } = require('objection');

const User = require('./User');

class Image extends Model {
  static get tableName() {
    return 'Images';
  }

  static get jsonScheme() {
    return {
      type: 'object',
      required: ['data'],
      properties: {
        id: { type: 'integer' },
        data: { type: 'binary' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationalMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Image.createdBy',
          to: 'User.id'
        }
      }
    };
  }
}

module.exports = Image;
