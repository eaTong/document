/**
 * Created by eatong on 17-12-1.
 */
import React, {Component} from 'react';
import {Page, AdminLayout} from '~components';
import {inject, observer} from 'mobx-react'
import ReactQuill from 'react-quill';


@inject() @observer
class Doc extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({text: value})
  }


  static async init(ctx) {
  }

  render() {
    const {} = this.props;
    return (
      <AdminLayout head='文档管理'>
        <ReactQuill
          value={this.state.text}
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
              ['link', 'image', 'video'],
              ['clean'],
            ],

            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          }}
          onChange={this.handleChange}/>
        <style dangerouslySetInnerHTML={{__html: style}}/>
      </AdminLayout>
    );
  }
}

Doc.propTypes = {};
export default Page(Doc);
