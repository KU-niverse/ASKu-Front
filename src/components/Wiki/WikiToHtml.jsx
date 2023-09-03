const WikiToHtml = (wikiText) => {
    let html = wikiText;
  
    // Convert [[File:...]] to <img> tags
    html = html.replace(/\[\[File:([^|\]]+)\]\]/g, '<img src="$1" />');
  
    // Replace <strong> tags with ''' and </strong> with '''
    html = html.replace(/<strong>/g, "'''");
    html = html.replace(/<\/strong>/g, "'''");
  
    // Replace <em> tags with '' and </em> with ''
    html = html.replace(/<em>/g, "''");
    html = html.replace(/<\/em>/g, "''");
  
    // Replace <del> tags with -- and </del> with --
    html = html.replace(/<del>/g, "--");
    html = html.replace(/<\/del>/g, "--");
  
    // Replace & with &amp;
    html = html.replace(/&/g, '&amp;');
  
    // Convert newline characters to <br>
    html = html.split('\n').map(para => `<p>${para}</p>`).join('\n');
    html = html.replace(/<p><\/p>/g, '<br>');
  
    return html;
  };
  
  export default WikiToHtml;
  