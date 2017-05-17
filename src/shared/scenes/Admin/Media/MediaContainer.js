/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchMediaIfNeeded,
  getMedia,
  deleteMedia,
  selectSettingFromList,
} from '../../../state';

import VisibleMedia from './VisibleMedia';

type Props = {
  dispatch: Function,
  fetchMediaIfNeeded: () => {},
  hideModal: () => void,
  showModal: () => void,
  site: Object,
  ui: Object,
  media: Array<Object>,
};

export class MediaContainer extends Component {
  static defaultProps: {
    profile: {},
    fetchMediaIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.dispatch(fetchMediaIfNeeded());
  }
  props: Props;

  render() {
    return (
      <VisibleMedia media={this.props.media} />
    );
  }
}

const mapStateToProps = state => {
  return {
    ui: state.boldr.ui,
    media: getMedia(state),
  };
};

export default connect(mapStateToProps)(MediaContainer);
