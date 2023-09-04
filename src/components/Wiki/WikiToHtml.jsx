const WikiToHtml = (wikiText) => {
  let html = wikiText;
  console.log("여기가 1번 : ", html);
  html = html.split('\n').map(para => `<p>${para}</p>`).join('\n');
  html = html.replace(/<p><\/p>/g, '<br>');
  console.log("여기가 2번 : ", html);

  // 단락 처리 (p)
  // <p> 태그를 \n으로 변환된 부분을 <p> 태그로 재변환
  // <br> 태그를 \n으로 변환된 부분을 <br> 태그로 재변환
  
  // 강조 처리 (strong)
  html = html.replace(/'''([^']+)'''/g, '<strong>$1</strong>');
  
  // 이탤릭 처리 (em)
  html = html.replace(/''([^']+)''/g, '<em>$1</em>');
  
  // 취소선 처리 (del)
  html = html.replace(/--([^']+)--/g, '<del>$1</del>');

  // &amp;를 &로 변환
  html = html.replace(/&amp;/g, '&');
  // Convert [[File:...]] to <img> tags
  html = html.replace(/\[\[File:([^|\]]+)\]\]/g, '<img src="$1" />');
  console.log("여기가 3번 : ", html);
  
  // //3. [[멀틱스|신기한 운영체제]] -> <a href="../멀틱스">신기한 운영체제</a>
  //  html = html.replace(/\[\[(.*?)\|(.*?)\]\]/g, '<a href="http://localhost:3000/wiki/$1">$2</a>');
   //1. [[멀틱스]] -> <a href="../멀틱스">멀틱스</a>
   // Convert [[멀틱스]] to <a href="../멀틱스">멀틱스</a>

  const linkRegex = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;

  html = html.replace(linkRegex, (match, url, displayText) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      // Case 2 and 4: Direct link with optional display text
      return `<a href="${url}">${displayText || url}</a>`;
    } else if (url.startsWith("File:")) {
      // Case for File: links: Add the URL as an image src
      const imageUrl = url.slice("File:".length);
      return `<img src="${imageUrl}" alt="${displayText || imageUrl}">`;
    } else {
      // Case 1 and 3: Internal link with optional display text
      const baseUrl = "../wiki"; // Adjust this base URL as needed
      return `<a href="${baseUrl}/${url}">${displayText || url}</a>`;
    }
  });

 

  // html = html.replace(/\[\[([^\]]+)\]\]/g, (_, link) => {
  //   // 링크가 HTTP 또는 HTTPS로 시작하는 경우
  //   if (link.startsWith('http://') || link.startsWith('https://')) {
  //     return `<a href="${link}">${link}</a>`;
  //   }
  //   // 내부 문서 링크로 처리
  //   return `<a href="../${link}">${link}</a>`;
  // });
   //1. [[멀틱스]] -> <a href="../멀틱스">멀틱스</a>
   //html = html.replace(/\[\[([^\]]+)\]\]/g, '<a href="http://localhost:3000/wiki/$1">$1</a>');
   


  return html;
};

export default WikiToHtml;
