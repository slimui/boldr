/* @flow */
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactChildren,
  inline: boolean,
  handleSubmit: () => void,
};

export type MetaProps = {
  error: string,
  warning: string,
  touched: boolean,
};

const CustomForm = styled.form`
  display: {props => props.inline ? 'inline' : 'block'};
`;
const Form = (props: Props) => {
  const { handleSubmit } = props;

  return (
    <CustomForm className="boldrui-form" onSubmit={handleSubmit} {...props}>
      {props.children}
    </CustomForm>
  );
};

Form.defaultProps = {
  inline: false,
};

export default Form;
