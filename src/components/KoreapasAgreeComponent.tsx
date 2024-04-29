import React from 'react';

export const KoreapasAgreeComponent = ({
  nickname
}: any) => {

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고파스로 로그인</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: white;
      }
  
      .card {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: white;
        border-radius: 0.5rem;
        padding: 1rem;
        max-width: 400px;
        margin: auto;
      }
  
      .information-box {
        border: 1px solid #e5e7eb;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
      }
  
      .bullet {
        color: black;
        font-size: 1em;
        display: inline-block;
        width: 1em;
        margin-right: 0.5em;
      }
  
      .information-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.25rem;
      }
  
      .information-item small {
        font-size: 0.75em;
      }
  
      .btn-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
  
      .btn {
        flex-grow: 1;
        padding: 0.6rem;
        margin: 0 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 0.5rem;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
      }
  
      .btn-cancel {
        background-color: #d1d5db;
        color: white;
        margin-left: 0;
      }
  
      .btn-agree {
        background-color: #e55356;
        color: white;
        margin-right: 0;
      }
  
      .btn:hover {
        opacity: 0.9;
      }
  
      .footer-links {
        text-align: center;
        font-size: 0.75rem;
        margin-top: 0.5rem;
        padding-bottom: 1rem;
      }
  
      .footer-links a {
        color: #888;
        text-decoration: none;
        padding: 0 0.25rem;
        target: _blank;
      }
  
      .footer-links a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  
  <body>
    <div class="min-h-screen flex items-center justify-center">
      <div class="card">
        <div class="information-box" style="padding-top: 0.5rem; padding-bottom: 1.5rem;">
          <h2 class="text-xl mb-4">ASKU에서 "${nickname}"님의 개인정보에 접근하는 것에 동의하십니까?</h2>
          <p class="mb-2 text-sm">제공된 정보는 이용자 식별, 계정 연동 및 CS 등을 위해 서비스 이용기간 동안 활용/보관됩니다.</p>
          <p class="mb-4 text-sm">기본 정보 및 필수 제공 항목은 ASKU 서비스를 이용하기 위해 반드시 제공되어야 할 정보입니다.</p>
  
          <strong class="block text-sm font-bold mb-1">기본 정보</strong>
          <p class="text-xs mb-4">고파스 이용자 고유 식별자 (uuid)</p>
  
          <strong class="block text-sm font-bold mb-3">필수 제공 항목</strong>
          <div class="information-item text-xs mb-3">
            <div>
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox" checked disabled>
                <span class="ml-2">고파스 닉네임</span>
              </label>
            </div>
          </div>
  
          <strong class="block text-sm font-bold mb-3">추가 제공 항목</strong> <!-- Increased space -->
          <div class="information-item text-xs mb-2">
            <span>(없음)</span>
          </div>
        </div>
        <p class="text-xs mb-2">동의 후에는, 해당 서비스의 이용약관 및 개인정보처리방침에 따라 정보가 관리됩니다.</p>
        <p class="text-xs mb-2">* 로그인에 이용된 고파스 아이디와 비밀번호는 제공되지 않습니다.</p>
        <!-- <div class="btn-container">
                  <button class="btn btn-cancel">취소</button>
                  <button class="btn btn-agree">동의하기</button>
              </div> -->
        <div class="footer-links">
          <a href="https://www.koreapas.com/bbs/zboard.php?id=postit" target="_blank">고파스 소개</a> |
          <a href="https://www.koreapas.com/bbs/join_license.txt" target="_blank">이용약관</a> |
          <a href="https://www.koreapas.com/privacy.php" target="_blank">개인정보취급방침</a> |
          <a href="https://pf.kakao.com/_mmKju" target="_blank">이용문의</a> |
          <a href="https://www.koreapas.com/bbs/zboard.php?id=postit" target="_blank">FAQ</a>
          <p>KOREAPAS.COM ⓒ 2023</p>
        </div>
      </div>
    </div>
  </body>
  
  </html>`
  const htmlSrc = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

  return (
        <iframe
      src={htmlSrc}
      style={{ width: '100%', height: '557px', border: 'none', marginBottom: '20px' }}
      title="External Content"
    ></iframe>
  );
};