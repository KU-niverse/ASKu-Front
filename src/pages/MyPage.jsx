import React from 'react';
import styles from './MyPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import haho from '../img/haho.png';
import comment_icon from '../img/comment_icon.png';
import Graph from "../components/Graph";
import { Link } from 'react-router-dom';

function MyPage() {
  const data = [
    {
      name: "입실렌티",
      value: 40,
      description: "40%",
      color: "rgba(251, 108, 108, 1)",
    },
    {
      name: "수강신청",
      value: 30,
      description: "30%",
      color: "rgba(255, 214, 0, 1)",
    },
    {
      name: "고연전",
      value: 16,
      description: "16%",
      color: "rgba(251, 193, 108, 1)",
    },
    {
      name: "기타",
      value: 14,
      description: "14%",
      color: "rgba(217, 217, 217, 1)",
    },
  ];

  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      <div className={styles.mypagecontent}>
      <div className={styles.uppercontent}>
        <div className={styles.leftcontent}>
          <div className={styles.profile}>
            <div className={styles.profileheader}> 
              <p className={styles.title}>내 프로필</p>
              <button className={styles.edit}>수정하기</button>
            </div>
            <div className={styles.profileimg}>
              <img className={styles.profileimg_content} src={haho} alt='haho'/>
            </div>
            <div className={styles.profilerow}>
              <div className={styles.rownick}>
                  <span className={styles.rowtitle}>닉네임</span>
                  <span className={styles.text}> 하호</span>
              </div>
                <div className={styles.rowbadge}>
                  <span className={styles.rowtitle}>대표 뱃지</span>
                  <span className={styles.text}>질문왕</span>
                </div>
                <div className={styles.rowpoint}>
                  <span className={styles.rowtitle}>포인트</span>
                  <div className={styles.text}>
                    <span className={styles.point}>1000p</span> 
                    <span className={styles.rank}> &nbsp;&nbsp;&nbsp;상위 10%</span>
                  </div>
                </div>
            </div>
          </div>  

              
          <div className={styles.badge}>
            <div className={styles.badgeheader}> 
              <p className={styles.title}>뱃지</p>
              <Link to='/mypage/mybadge'className={styles.b_link} >
              <button className={styles.edit}> 더보기</button>
              </Link>
            </div>            
              <div className={styles.badgegrid}>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
                <img src={haho} alt='haho'/>
              </div>
          </div>
        </div>
       
        <div className={styles.rightcontent}>
          <div className={styles.info}>
            <div className={styles.infoheader}>
              <p className={styles.title}>내 정보</p>
            </div>
            <div className={styles.inforow}>
              <div className={styles.rowname}>
                  <span className={styles.rowtitle}>이름</span>
                  <span className={styles.text}> 하호</span>
              </div>
              <div className={styles.rowemail}>
                  <span className={styles.rowtitle}>이메일</span>
                  <span className={styles.text}>asku1234@gmail.com</span>
              </div>
              <div className={styles.rowid}>
                  <span className={styles.rowtitle}>학번</span>
                  <span className={styles.text}>2019140004</span>
              </div>
            </div>
            <div className={styles.infoedit}>
                <button className={styles.edit2}>비밀번호 변경</button>
                <button className={styles.edit3}>개인정보 변경</button>
            </div>
          </div>
          <div className={styles.cb}>
            <p className={styles.title}>기여 목록</p>
            <div className={styles.graph}>
              <Graph data={data} />
            </div>
            <div className={styles.cb_list}>
              <div className={styles.cb_front}>
                <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
              </div>
              <div className={styles.cb_back}> 
                <span className={styles.cb_num}>+10p</span>
                <span className={styles.cb_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
            <div className={styles.cb_list}>
              <div className={styles.cb_front}>
                <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
              </div>
              <div className={styles.cb_back}> 
                <span className={styles.cb_num}>+10p</span>
                <span className={styles.cb_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
            <div className={styles.cb_list}>
              <div className={styles.cb_front}>
                <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
              </div>
              <div className={styles.cb_back}> 
                <span className={styles.cb_num}>+10p</span>
                <span className={styles.cb_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
            <div className={styles.cb_list}>
              <div className={styles.cb_front}>
                <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
              </div>
              <div className={styles.cb_back}> 
                <span className={styles.cb_num}>+10p</span>
                <span className={styles.cb_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
            <div className={styles.cb_list}>
              <div className={styles.cb_front}>
                <span className={styles.cb_index}>안녕하세요 제이름은 하찮은 호랑이입니다 많이 사랑해주세요</span>
              </div>
              <div className={styles.cb_back}> 
                <span className={styles.cb_num}>+10p</span>
                <span className={styles.cb_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className={styles.middlecontent}>
        <div className={styles.ask}>
          <div className={styles.askheader}>
            <p className={styles.title}>내가 쓴 질문</p>
            <Link to='/mypage/myquestion' className={styles.q_link}>
            <button className={styles.edit}>더보기</button>
            </Link>
          </div>
          <div className={styles.ask_list}>
            <span className={styles.ask_icon}>Q. </span>
            <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.ask_list}>
            <span className={styles.ask_icon}>Q. </span>
            <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.ask_list}>
            <span className={styles.ask_icon}>Q. </span>
            <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.ask_list}>
            <span className={styles.ask_icon}>Q. </span>
            <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
          <div className={styles.ask_list}>
            <span className={styles.ask_icon}>Q. </span>
            <span className={styles.ask_content}>빼빼로 나라에 사는 빼빼 마른 빼빼로가 아몬드 빼빼로 나라에 사는 친구 안 빼빼 마른 빼빼로를 보고 "살 빼!" 하니까 안 빼빼 마른 빼빼로가 빼액빼액 화를 내며 빼빼로 나라로 돌아갔대요.</span>
          </div>
        </div>
      </div>
      <div className={styles.downcontent}>
        <div className={styles.comment}>
          <div className={styles.commentheader}>
            <p className={styles.title}>내가 쓴 댓글</p>
            <Link to='/mypage/mycomment' className={styles.c_link}>
            <button className={styles.edit}>더보기</button>
            </Link>
          </div>
          <div className={styles.comment_list}>
            <div className={styles.comment_icon}>
              <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
            </div>
            <span className={styles.comment_content}>안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데, 촉촉한 초코칩 나라의 촉촉한 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 눈물을 흘리며 안 촉촉한 초코칩 나라로 돌아갔다.</span>
          </div>
          <div className={styles.comment_list}>
            <div className={styles.comment_icon}>
              <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
            </div>
            <span className={styles.comment_content}>안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데, 촉촉한 초코칩 나라의 촉촉한 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 눈물을 흘리며 안 촉촉한 초코칩 나라로 돌아갔다.</span>
          </div>
          <div className={styles.comment_list}>
            <div className={styles.comment_icon}>
              <img className={styles.comment_png} src={comment_icon} alt='comment_icon'/>
            </div>
            <span className={styles.comment_content}>안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데, 촉촉한 초코칩 나라의 촉촉한 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 눈물을 흘리며 안 촉촉한 초코칩 나라로 돌아갔다.</span>
          </div>
        </div>
      </div>
      </div>
      <div>
          <Footer />
      </div>
    </div>
  );
};




export default MyPage;