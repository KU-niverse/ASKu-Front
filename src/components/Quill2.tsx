import 'react-quill/dist/quill.snow.css'
import './QuillStyle.css'
import ReactQuill from 'react-quill'
import axios from 'axios'
import { useMemo, useRef, useState, useEffect } from 'react'

interface QuillProps {
  value: string
  onChange: (value: string) => void
}

const Quill = ({ value: propValue, onChange }: QuillProps) => {
  const [value, setValue] = useState(propValue)
  const quillRef = useRef<ReactQuill | null>(null)

  useEffect(() => {
    setValue(propValue)
  }, [propValue])

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('image', file)

      try {
        const result = await axios.post(`${process.env.REACT_APP_HOST}/wiki/image`, formData, { withCredentials: true })
        const IMG_URL = result.data.url

        const editor = quillRef.current?.getEditor()
        if (editor) {
          const range = editor.getSelection()
          if (range) {
            editor.clipboard.dangerouslyPasteHTML(range.index, `<img src="${IMG_URL}" alt="Image" />`)
          }
        }
      } catch (error) {
        console.error(error)
        alert('이미지 업로드중 오류가 발생하였습니다. \n (최대 용량은 5MB입니다)')
      }
    })
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'bullet' }],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
    'list',
    'bullet',
    'indent',
    'align',
    'color',
    'background',
  ]

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme={'snow'}
        placeholder={'내용을 작성해주세요(내용을 작성해야 제출이 완료됩니다.)'}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          onChange(newValue)
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default Quill
