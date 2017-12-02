/**
 * Created by eatong on 17-12-1.
 */
import React, {Component} from 'react';

class Editor extends Component {
  state = {mounted: false, value: ''};

  componentDidMount() {
    this.setState({mounted: true});
  }

  handleChange(value) {
    this.setState({value});
    console.log(value);
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    if (this.state.mounted) {
      const Quill = require('react-quill');
      return (
        <Quill
          value={this.state.value}
          modules={{
            toolbar: [
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'color': []}, {'background': []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              ['code-block'],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image',],
              ['clean'],
            ],
            clipboard: {
              matchVisual: false,
            }
          }}
          onChange={this.handleChange.bind(this)}
        />
      )
    } else {
      return (<textarea/>)
    }
  }
}

Editor.propTypes = {};
export default Editor;
