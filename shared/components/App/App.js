/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import testIfMobile from '../../core/utils/testIfMobile';
import { setMobileDevice } from '../../state/modules/boldr/ui/actions';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';

if (process.env.NODE_ENV !== 'test') {
  require('../../styles/main.scss');
}

type Props = {
  children: ReactChildren,
  dispatch: Function,
  location: Object,
  isMobile: Boolean,
};

class App extends Component {
  static childContextTypes = {
    dispatch: React.PropTypes.func,
    isMobile: React.PropTypes.bool,
    location: React.PropTypes.object,
  }
  getChildContext() {
    const { dispatch, isMobile, location } = this.props;
    return { dispatch, isMobile, location };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    window.addEventListener('resize', debounce(event => {
      dispatch(setMobileDevice(testIfMobile()));
    }, 1000));
  }
  props: Props;
  render() {
    return (
    <div>
      { React.Children.toArray(this.props.children) }
      <Notifications />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.boldr.ui,
    isMobile: state.boldr.ui.isMobile,
  };
};

export default connect(mapStateToProps)(App);