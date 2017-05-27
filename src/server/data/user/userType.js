import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import User from '../../models/User';
import ArticleType from '../article/articleType';
import MediaType from '../media/mediaType';
import AttachmentType from '../attachment/attachmentType';
import RoleType from '../role/roleType';

export const SocialType = new GraphQLObjectType({
  name: 'Social',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The id',
    },
    userId: {
      type: GraphQLUUID,
      description: 'The unique identifier for the user for the identity.',
    },
    facebookUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    twitterUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    googleUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    githubUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    linkedinUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
    stackoverflowUrl: {
      type: GraphQLURL,
      description: 'The facebook profile url for the user.',
    },
  }),
});

export const ResetTokenType = new GraphQLObjectType({
  name: 'ResetToken',
  description: 'Reset password token.',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier (usually email) of blocked user',
    },
    ip: {
      type: GraphQLString,
      description: 'The ip address of the person performing the reset',
    },
    token: {
      type: GraphQLString,
      description: 'The reset token',
    },
    used: {
      type: GraphQLBoolean,
      description: 'True if the token has been used before.',
    },
    userId: {
      type: GraphQLUUID,
      description: 'The IP address of the blocked user',
    },
    createdAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was created',
    },
    updatedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was last updated',
    },
  }),
});

export const VerificationTokenType = new GraphQLObjectType({
  name: 'VerificationToken',
  description: 'Account verification token for a user',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier (usually email) of blocked user',
    },
    ip: {
      type: GraphQLString,
      description: 'The ip address of the person performing the reset',
    },
    token: {
      type: GraphQLString,
      description: 'The reset token',
    },
    used: {
      type: GraphQLBoolean,
      description: 'True if the token has been used before.',
    },
    userId: {
      type: GraphQLUUID,
      description: 'The IP address of the blocked user',
    },
    createdAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was created',
    },
    updatedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was last updated',
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'The user or account',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The users id (uuid)',
    },
    deletedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the user was deleted',
    },
    updatedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the user was last updated',
    },
    createdAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the user was created',
    },
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The user email',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user',
    },
    verified: {
      type: GraphQLBoolean,
      description: 'true if email is verified, false otherwise',
    },
    website: {
      type: GraphQLURL,
      description: 'The website of the user',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name associated with the user',
    },
    bio: {
      type: GraphQLString,
      description: 'Information about the user',
    },
    avatarUrl: {
      type: GraphQLURL,
      description: "url of user's avatar picture",
    },
    profileImage: {
      type: GraphQLURL,
      description: "Url for the user's profile background image",
    },
    location: {
      type: GraphQLString,
      description: 'Location the user lives',
    },
    language: {
      type: GraphQLString,
      description: 'Language the user prefers',
    },
    birthday: {
      type: GraphQLDateTime,
      description: 'When the user was born',
    },
    roles: {
      type: new GraphQLList(RoleType),
      description: 'Roles the user belongs to.',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('roles'))
          .then(jsonResult);
      },
    },
    socialMedia: {
      type: SocialType,
      description: 'Social media profiles of the user.',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('socialMedia'))
          .then(jsonResult);
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('articles'))
          .then(jsonResult);
      },
    },
    files: {
      type: new GraphQLList(AttachmentType),
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('files'))
          .then(jsonResult);
      },
    },
    uploads: {
      type: new GraphQLList(MediaType),
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('uploads'))
          .then(jsonResult);
      },
    },
    verificationToken: {
      type: VerificationTokenType,
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('verificationToken'))
          .then(jsonResult);
      },
    },
    resetToken: {
      type: ResetTokenType,
      description: 'Articles the user has written',
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('resetToken'))
          .then(jsonResult);
      },
    },
  }),
});

export default UserType;
