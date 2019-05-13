const { Model } = require('objection');

const User = require('./User');
const Comment = require('./Comment');

class Image extends Model {
  static get tableName() {
    return 'Images';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['url'],
      properties: {
        id: { type: 'integer' },
        url: { type: 'string' },
        original: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        createdBy: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'Image.createdBy',
          to: 'User.id'
        }
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'Image.id',
          to: 'Comment.image'
        }
      }
    };
  }
}

module.exports = Image;
