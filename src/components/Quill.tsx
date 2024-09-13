import 'react-quill/dist/quill.snow.css'
import './QuillStyle.css'
import ReactQuill from 'react-quill'
import axios from 'axios'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useMutation } from 'react-query'

function Quill({ value, onChange }: { value: string; onChange: (newValue: string) => void }) {
  const [editorValue, setEditorValue] = useState(value)
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    setEditorValue(value)
  }, [value])

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    const result = await axios.post(`${process.env.REACT_APP_HOST}/wiki/image`, formData, { withCredentials: true })
    return result.data.url
  }

  const mutation = useMutation(uploadImage, {
    onSuccess: (IMG_URL) => {
      const editor = quillRef.current?.getEditor()
      const range = editor?.getSelection()
      editor?.clipboard.dangerouslyPasteHTML(range?.index ?? 0, `<img src="${IMG_URL}" />`)
    },
    onError: (error) => {
      console.error(error)
      alert('이미지 업로드 중 오류가 발생하였습니다. (최대 용량은 5MB입니다)')
    },
  })

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (file) {
        mutation.mutate(file)
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
        value={editorValue}
        onChange={(newValue) => {
          setEditorValue(newValue)
          onChange(newValue)
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default Quill
