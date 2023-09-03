const HtmlToWiki = (html) => {
  let wikiText = html;

  // Convert <strong> and <em> tags to ''' and ''', respectively
  wikiText = wikiText.replace(/<strong>(.*?)<\/strong>/g, "'''$1'''");
  wikiText = wikiText.replace(/<em>(.*?)<\/em>/g, "''$1''");

  // Convert <del> tags to --
  wikiText = wikiText.replace(/<del>(.*?)<\/del>/g, "--$1--");

  // Remove <br> tags
  wikiText = wikiText.replace(/<br>/g, '');

  // Convert <img> tags to [[File:...]]
  wikiText = wikiText.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, '[[File:$1]]');

  // Remove other HTML tags
  wikiText = wikiText.replace(/<\/?[^>]*>/g, '');

  // Replace &nbsp; with a space
  wikiText = wikiText.replace(/&nbsp;/g, ' ');

  return wikiText;
};



export default HtmlToWiki