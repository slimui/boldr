/* @flow */

import * as React from 'react';
import cn from 'classnames';
import Undo from '@boldr/icons/Undo';
import Redo from '@boldr/icons/Redo';
import Option from '../../Option';

export type Props = {
  onChange?: Function,
  config: Object,
  currentState: Object,
};

export default class HistoryLayout extends React.PureComponent<Props, *> {
  props: Props;
  onChange = obj => {
    const { onChange } = this.props;
    onChange(obj);
  };

  render(): React.Node {
    const {
      config: { undo, redo, className },
      currentState: { undoDisabled, redoDisabled },
    } = this.props;
    return (
      <div className={cn('be-ctrl__group', className)} aria-label="be-history-control">
        <Option
          value="undo"
          onClick={this.onChange}
          className={cn(undo.className)}
          disabled={undoDisabled}
          title={undo.title}>
          <Undo fill="#222" />
        </Option>
        <Option
          value="redo"
          onClick={this.onChange}
          className={cn(redo.className)}
          disabled={redoDisabled}
          title={redo.title}>
          <Redo fill="#222" />
        </Option>
      </div>
    );
  }
}
