const WikiToHtml = (wikiText: any) => {
  // Convert list items before converting text to <p> tags
  const convertTextToHTML = (inputText: string): string => {
    const pattern = /\*\s*(.+)/g // Adjusted to match both * (content) and *(content)
    const lines = inputText.match(pattern)

    if (!lines) return inputText // Return original text if no matches found

    let convertedHtml = '<ul>\n'
    lines.forEach((line) => {
      const content = line.replace(/\*\s*/, '').trim() // Handle both * (content) and *(content)
      convertedHtml += `  <li>${content}</li>\n`
    })
    convertedHtml += '</ul>'
    return convertedHtml
  }

  // Use regex to find and replace list patterns first
  const listPattern = /(\*\s*.+\n?)+/g
  let html = wikiText.replace(listPattern, (match: string) => convertTextToHTML(match))

  // Now convert the remaining text to <p> tags, but only if it's not part of a list
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

  // Additional conversions
  html = html.replace(/'''([^']+)'''/g, '<strong>$1</strong>') // Bold
  html = html.replace(/''([^']+)''/g, '<em>$1</em>') // Italics
  html = html.replace(/--([^']+)--/g, '<del>$1</del>') // Strikethrough
  html = html.replace(/--(.*?)--/g, '<s>$1</s>') // Strikethrough as <s>
  html = html.replace(/@(.*?)@/g, '<blockquote>$1</blockquote>') // Blockquote
  html = html.replace(/__(.*?)__/g, '<u>$1</u>') // Underline
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
