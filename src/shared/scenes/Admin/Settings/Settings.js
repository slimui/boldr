/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ExpansionList, TextField } from 'boldr-ui';

import { SiteName, SiteUrl, SiteDescription, Logo, Favicon } from './components';

type Props = {
  siteName: Object,
  siteUrl: Object,
  siteLogo: Object,
  siteDesc: Object,
  siteFav: Object,
};

class Settings extends Component {
  props: Props;

  render() {
    return (
      <div className="boldr-settings">
        <Helmet title="Admin: Settings" />
        <ExpansionList style={ { padding: 16 } }>
          <SiteName { ...this.props.siteName } />
          <SiteUrl { ...this.props.siteUrl } />
          <Logo { ...this.props.siteLogo } />
          <SiteDescription { ...this.props.siteDesc } />
          <Favicon { ...this.props.siteFav } />
        </ExpansionList>
      </div>
    );
  }
}

export default Settings;
