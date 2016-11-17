import React, { Component } from 'react';
import {
  ContentState,
  Editor,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';

import 'draft-js/dist/Draft.css';

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

class HTMLConvertExample extends Component {
  constructor(props) {
    super(props);

    const sampleMarkup =
      '<p>sample <strong>bold</strong> content</p>';

    const blocksFromHTML = convertFromHTML(sampleMarkup);

    // Below will fail because blocksFromHTML returns an array, not an object
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.state = {
      editorState: EditorState.createWithContent(
        state
      ),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={{marginBottom: 10}}>
          Sample HTML converted into Draft content state
        </div>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}


export default HTMLConvertExample;
