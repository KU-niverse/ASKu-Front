import React from 'react'

const WikiToHtml = (wikiText) => {
        let html = wikiText;
        
        //html = html.replace(/===([^=].*?)===/g, '<h3>$1</h3>');
        
        //단락 처리
        html = html.replace(/\n([^=].*?)\n/g, '<p>$1</p>');

        html = html.replace(/'''([^=].*?)'''/g, '<strong>$1</strong>');
        
        // 강조 처리
        html = html.replace(/''(.+?)''/g, '<em>$1</em>');
        
        // 링크 처리
        html = html.replace(/--(.+?)--/g, '<del>$1</del>');

        html = html.replace(/&amp;/g, '&');
      
        return html;
};


export default WikiToHtml