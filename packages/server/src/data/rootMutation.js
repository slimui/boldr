import { GraphQLObjectType } from 'graphql';
import article from './article/articleMutation';
import category from './category/categoryMutation';
import contentType from './contentType/contentTypeMutation';
import file from './file/fileMutation';
import media from './media/mediaMutation';
import menu from './menu/menuMutation';
import setting from './setting/settingMutation';
import tag from './tag/tagMutation';
import user from './user/userMutation';

const rootFields = Object.assign(
  {},
  article,
  category,
  contentType,
  file,
  media,
  menu,
  setting,
  tag,
  user,
);

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
});

export default RootMutationType;
