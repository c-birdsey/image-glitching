const { Model } = require('objection');

const Image = require('./Image');

class Comment extends Model {
  static get tableName() {
    return 'Comments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['body'],
      properties: {
        id: { type: 'integer' },
        body: { type: 'text' },
        createdAt: { type: 'string', format: 'date-time' },
        image: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Image,
        join: {
          from: 'Comment.image',
          to: 'Image.id'
        }
      }
    };
  }
}

module.exports = Comment;
