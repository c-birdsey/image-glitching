const { Model } = require('objection');

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
        data: { type: 'binary' }
      }
    };
  }
}

module.exports = Image;
