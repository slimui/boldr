/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import Dialog from '@boldr/ui/Dialog';
import type { User } from '../../../types/boldr';

import { MembersList, EditMemberForm } from './components';

type Props = {
  visible: boolean,
  close: Function,
  initialValues: Object,
  accounts: Array<User>,
  toggleUser: Function,
  handleSubmit: Function,
};

const Members = (props: Props) => {
  return (
    <div>
      <Helmet title="Admin: Members" />
      <MembersList toggleUser={props.toggleUser} accounts={props.accounts} />
      <Dialog title="Edit User" visible={props.visible} onClose={props.close}>
        <EditMemberForm onSubmit={props.handleSubmit} initialValues={props.initialValues} />
      </Dialog>
    </div>
  );
};
export default Members;
