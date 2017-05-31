import { GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../services/hashing';
import { mailer, signToken, generateHash } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import User from '../../models/User';
import VerificationToken from '../../models/VerificationToken';
import {
  UserLoginInput,
  UserLoginResponse,
  UserSignupInput,
  AuthError,
} from './auth/userAuthTypes';
import UserType from './userType';

export default {
  loginUser: {
    type: UserLoginResponse,
    description: 'for troubleshooting by admins, create a JWT for a given userId',
    args: {
      user: {
        type: new GraphQLNonNull(UserLoginInput),
      },
    },
    async resolve(_, args, context) {
      const user = await User.query()
        .where({ email: args.user.email })
        .eager('[roles,socialMedia]')
        .first();

      const validAuth = await user.authenticate(args.user.password);
      // remove the password from the response.
      user.stripPassword();
      // sign the token
      const token = signToken(user);
      context.req.user = user;
      const payload = {
        token,
        user,
      };
      return payload;
    },
  },
  signupUser: {
    type: UserType,
    description: 'A user registering for an account.',
    args: {
      user: {
        type: new GraphQLNonNull(UserSignupInput),
      },
    },
    async resolve(_, args, context) {
      console.log(args);
      const checkUser = await User.query()
        .where({ email: args.user.email })
        .first();

      if (checkUser) {
        return new Error('The user exists');
      }

      const newUser = await User.query().insert(args.user);
      await newUser.$relatedQuery('roles').relate({ id: 1 });

      if (!newUser) {
        return new Error('Signup failed');
      }
      // generate user verification token to send in the email.
      const verifToken = uuid.v4();
      // get the mail template
      const mailBody = welcomeEmail(verifToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(newUser, mailBody, mailSubject);
      // create a relationship between the user and the token
      const verificationEmail = await newUser
        .$relatedQuery('verificationToken')
        .insert({
          ip: context.req.ip,
          token: verifToken,
          userId: newUser.id,
        });
      return newUser;
    },
  },
};