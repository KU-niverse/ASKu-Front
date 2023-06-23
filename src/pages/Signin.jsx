import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='container'>
        <form>
            <div >
                <div>LOGIN</div>
                <input type='text' placeholder='아이디를 입력하세요'/>
                <input type='text' placeholder='비밀번호를 입력하세요' />
                <span><input type='checkbox' />아이디 기억하기</span>
            </div>
            <button>로그인</button>
        </form>
        <div>
            <Link to="/signup">회원가입</Link>
        </div>
        <div>
            <Link to="/signup">아이디를 잊으셨나요?</Link>
            <Link to="/signup">비밀번호를 잊으셨나요?</Link>
        </div>
    </div>
    
  )
}

export default Signin