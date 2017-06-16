/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { gql, graphql } from 'react-apollo';
import Loader from '~components/Loader';
import BaseTemplate from '../../../templates/BaseTemplate';
import TagList from './TagList';

type Props = {
  data: Object,
  isFetching: boolean,
  match: Object,
};

export class TagListContainer extends PureComponent {
  props: Props;
  render() {
    const { data: { loading, getArticlesForTag }, match: { params } } = this.props;
    if (loading) {
      return <Loader />;
    }
    return (
      <BaseTemplate helmetMeta={<Helmet title={`Posts tagged ${params.name}`} />}>
        <TagList articles={getArticlesForTag} />
      </BaseTemplate>
    );
  }
}

export default graphql(
  gql`
  query getArticlesForTag($name: String!) {
      getArticlesForTag(name: $name,offset:0,limit:20) {
        id,
        title,
        content,
        slug,
        featureImage,
        backgroundImage,
        excerpt,
        createdAt,
        userId,
        tags {
          id,
          name
        }
      }
  }
`,
  {
    options: props => ({
      variables: {
        name: props.match.params.name,
      },
    }),
  },
)(TagListContainer);