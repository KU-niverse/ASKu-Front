import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface EditorComponentProps {
  value: string
  onChange: (content: string) => void
}

class EditorComponent extends Component<EditorComponentProps> {
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ],
  }

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]

  render() {
    const { value, onChange } = this.props
    return (
      <div>
        <ReactQuill
          style={{ height: '700px', border: '2px solid rgba(213, 213, 213, 1)', borderRadius: '0px 12px 12px 12px' }}
          theme={'snow'}
          modules={this.modules}
          formats={this.formats}
          value={value || ''}
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      </div>
    )
  }
}

export default EditorComponent
