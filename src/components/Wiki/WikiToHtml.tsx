const WikiToHtml = (wikiText: any) => {
  // 리스트 항목의 텍스트를 <p> 태그로 변환
  const convertTextToHTML = (inputText: string): string => {
    const pattern = /\*\s*(.+)/g // *(내용), * (내용) 띄워쓰기 유무 상관없이 인식 가능하도록 수정
    const lines = inputText.match(pattern)

    if (!lines) return inputText // 매칭 없을 시 원본 텍스트 반환

    let convertedHtml = '<ul>\n'
    lines.forEach((line) => {
      const content = line.replace(/\*\s*/, '').trim()
      convertedHtml += `  <li>${content}</li>\n`
    })
    convertedHtml += '</ul>'
    return convertedHtml
  }

  // 정규 표현식을 이용해 목록 패턴을 찾을 후 replace
  const listPattern = /(\*\s*.+\n?)+/g
  let html = wikiText.replace(listPattern, (match: string) => convertTextToHTML(match))

  // 리스트 일부가 아닌 경우, 남은 텍스트를 <p> 태그로 변환
  html = html
    .split('\n')
    .map((para: any) => {
      if (!para.startsWith('<ul>') && !para.startsWith('<li>') && para.trim() !== '') {
        return `<p>${para}</p>`
      }
      return para
    })
    .join('\n')

  html = html.replace(/<p><\/p>/g, '<br>')

  // 추가 변환
  html = html.replace(/'''([^']+)'''/g, '<strong>$1</strong>') // 굵게
  html = html.replace(/''([^']+)''/g, '<em>$1</em>') // 이탤릭체
  html = html.replace(/--([^']+)--/g, '<del>$1</del>') // 취소선
  html = html.replace(/--(.*?)--/g, '<s>$1</s>') // 취소선 대체 <s>
  html = html.replace(/@(.*?)@/g, '<blockquote>$1</blockquote>') // 인용
  html = html.replace(/__(.*?)__/g, '<u>$1</u>') // 밑줄
  html = html.replace(/&amp;/g, '&') // &amp; to &

  // Convert [[File:...]] to <img> tags
  html = html.replace(/\[\[File:([^|\]]+)\]\]/g, '<img src="$1" />')

  // Convert [[link]] and [[link|display]] to <a> tags
  const linkRegex = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g
  html = html.replace(linkRegex, (match: any, urlText: any, displayText: any) => {
    const url = urlText.trim()
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return `<a href="${url}">${displayText || url}</a>`
    }
    if (url.startsWith('File:')) {
      const imageUrl = url.slice('File:'.length)
      return `<img src="${imageUrl}" alt="${displayText || imageUrl}">`
    }
    const baseUrl = '../wiki'
    return `<a href="${baseUrl}/${url}">${displayText || url}</a>`
  })

  return html
}

export default WikiToHtml
