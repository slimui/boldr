import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
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
import UserType from './userType';

export default {
  getUsers: {
    type: new GraphQLList(UserType),
    description: 'A query for a listing of all users',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of users to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of users to return at a time.',
      },
    },
    async resolve(_, { limit, offset }, context) {
      const users = await User.query().offset(offset).limit(limit);
      if (users) {
        return users;
      }
      console.log('error');
    },
  },
  getUserByUserId: {
    type: UserType,
    description: 'A query for admin to find a user by their id',
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLUUID),
        description: 'The user ID for the desired user',
      },
    },
    async resolve(_, { userId }, context) {
      const user = await User.query().findById(userId);
      if (user) {
        return user;
      }
      console.log('error');
    },
  },
  getUserByUsername: {
    type: UserType,
    description: 'A query to retrieve a user by their username',
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The username for the desired user',
      },
    },
    async resolve(_, { username }, context) {
      const user = await User.getUserByUsername(username);
      if (user) {
        return user;
      }
      console.log('error');
    },
  },
  getCurrentUser: {
    type: UserType,
    description: 'Given an auth token, return the user and auth token',
    async resolve(_, args, context) {
      // const userId = requireAuth(authToken);
      const user = await User.query().findById(context.user.id);
      if (!user) {
        console.log('error');
      }
      return user;
    },
  },
};
