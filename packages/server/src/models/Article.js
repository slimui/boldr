import BaseModel, { mergeSchemas } from './BaseModel';
// Related Models
import Tag from './Tag';

class Article extends BaseModel {
  static tableName = 'article';
  // static softDelete = true;
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'slug', 'content', 'published', 'accountId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      title: { type: 'string' },
      slug: { type: 'string' },
      excerpt: { type: 'string' },
      content: {
        type: 'string',
      },
      rawContent: { type: 'json' },
      published: { type: 'boolean' },
      status: { type: { enum: ['published', 'archived', 'draft'] } },
      image: { type: 'string' },
      heroImage: { type: 'string' },
      featured: { type: 'boolean' },
      authorId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  });

  static get idColumn() {
    return 'id';
  }

  static relationMappings = {
    author: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'article.author_id',
        to: 'account.id',
      },
    },
    tags: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Tag`,
      join: {
        from: 'article.id',
        through: {
          from: 'article_tag.article_id',
          to: 'article_tag.tag_id',
          modelClass: `${__dirname}/join/ArticleTag`,
        },
        to: 'tag.id',
      },
    },
    category: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'article.category_id',
        to: 'category.id',
      },
    },
    media: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Media`,
      join: {
        from: 'article.id',
        through: {
          from: 'article_media.article_id',
          to: 'article_media.media_id',
        },
        to: 'media.id',
      },
    },
  };
  static getOnlyArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit);
  }
  static getArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'desc')
      .skipUndefined()
      .allowEager('[author,tags,media,category]');
  }
  static getArticlesByTag(name, offset, limit) {
    return Tag.query()
      .where({ name })
      .then(([tag]) => {
        return tag
          .$relatedQuery('articles')
          .offset(offset)
          .limit(limit);
      });
  }
  static getArticlesByUserId(userId) {
    return Article.query().where({ userId });
  }
  static getArticleById(id) {
    return Article.query()
      .where({ id })
      .then(x => x[0]);
  }

  static getArticleBySlug(slug) {
    return Article.query()
      .where({ slug })
      .eager('[tags,author,media]')
      .then(x => x[0]);
  }
}

export default Article;
