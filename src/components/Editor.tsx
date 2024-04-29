import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditorComponent extends Component{
    constructor(props: any){
        super(props);
    }

    modules = {
        toolbar: [
          //[{ 'font': [] }],
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link', 'image'],
        ],
      }
    
      formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

    render(){
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { value, onChange } = this.props;
        return(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <ReactQuill 
                  style={{height: "700px", border: '2px solid rgba(213, 213, 213, 1)', borderRadius: '0px 12px 12px 12px',}}
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent