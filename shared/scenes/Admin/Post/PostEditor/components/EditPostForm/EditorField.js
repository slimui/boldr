import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const wrapperStyle = {
  border: 'solid #ddd 1px',
  marginBottom: 20,
  borderRadius: 5,
  padding: 15,
};
const editorStyle = {
  minHeight: 400,
};
export default class EditorField extends Component {
  constructor(props) {
    super(props);
    let editorState = EditorState.createEmpty();
    if (props.input.value) {
      editorState = EditorState.createWithContent(stateFromHTML(props.input.value));
    }
    this.state = {
      editorState,
    }
  }

  onChange = editorState => {
    const { input } = this.props;
    input.onChange(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  render() {
    const { input, placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        wrapperStyle={ wrapperStyle }
        editorStyle={ editorStyle }
        // toolbarOnFocus
        {  ...input }
        onEditorStateChange={ this.onChange }
        editorState={ editorState }
        placeholder={ placeholder }
      />
    );
    // </div>;
  }
}
