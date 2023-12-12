import React from 'react';

export const KoreapasAgreeComponent = () => {
  return (
    <iframe 
      src={process.env.PUBLIC_URL + '/koreapasAgree.html'} 
      style={{ width: '100%', height: '557px', border: 'none', marginBottom: '20px'}}
      title="External Content"
    ></iframe>
  );
};