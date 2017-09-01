import BaseModel, { mergeSchemas } from './BaseModel';

class ContentT extends BaseModel {
  static tableName = 'content_type';
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name', 'slug'],
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      slug: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
      icon: {
        type: 'string',
        maxLength: 255,
      },
    },
  });

  static get relationMappings() {
    return {
      entities: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/Entity`,
        join: {
          from: 'content_type.id',
          to: 'entity.ctId',
        },
      },
    };
  }

  static getGontentTypes(offset, limit) {
    return ContentT.query()
      .offset(offset)
      .limit(limit);
  }
}

export default ContentT;
