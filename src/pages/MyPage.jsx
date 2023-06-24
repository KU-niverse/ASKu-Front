import React from 'react';
import styles from './MyPage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer'
import haho from '../img/haho.png';


function MyPage() {
  return (
    <div className={styles.container}>
      <div>
          <Header />
      </div>
      <div className={styles.header}>
        <p className={styles.mypage}>MYPAGE</p>
      </div>
      <div className={styles.uppercontent}>
        <div className={styles.leftcontent}>
          <div className={styles.profile}>
            <div className={styles.profileheader}> 
              <p className={styles.title}>내 프로필</p>
              <button className={styles.edit}>수정하기</button>
            </div>
            <div className={styles.profileimg}>
              <img className={styles.img} src={haho} alt='haho'/>
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
                  <li className={styles.text}>
                    <span>1000p</span> 
                    <span className={styles.rank}> &nbsp;&nbsp;&nbsp;상위 10%</span>
                  </li>
                </div>
            </div>
          </div>  

              
          <div className={styles.badge}>
            <div className={styles.badgeheader}> 
              <p className={styles.title}>뱃지</p>
              <button className={styles.edit}>더보기</button>
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
                <button className={styles.edit2}>개인정보 변경</button>
            </div>
          </div>
          <div className={styles.point}>
            <p className={styles.title}>기여 목록</p>
            <div className={styles.point_list}>
              <div className={styles.point_front}>
                <span className={styles.point_index}>고연전</span>
              </div>
              <div className={styles.point_back}> 
                <span className={styles.point_num}>+10p</span>
                <span className={styles.point_time}>2023.05.26 01:34:32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middlecontent}>
        <div className={styles.ask}>
          <p className={`${styles.title}`}>내가 쓴 질문</p>
          <div className={styles.list}></div>
        </div>
      </div>
      <div className={`${styles.downcontent}`}>
        <div className={`${styles.comment}`}>
          <p className={`${styles.title}`}>내가 쓴 댓글</p>
        </div>
      </div>
      <div>
          <Footer />
      </div>
    </div>
  );
};




export default MyPage;