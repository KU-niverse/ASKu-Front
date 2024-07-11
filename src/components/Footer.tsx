import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logoGray from '../img/logo_gray.png'

function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.textWrap}`}>
        <div className={`${styles.linkContainer}`}>
          <div className={`${styles.linkGroup}`}>
            <button type={'button'} className={`${styles.footerTitle}`}>
              {'고객 센터'}
            </button>
            <Link to={'https://open.kakao.com/o/s74JtHlf'} target={'_blank'}>
              <button type={'button'} className={`${styles.footerButton}`}>
                {'1:1 문의'}
              </button>
            </Link>
            <Link to={'https://034179.notion.site/FAQ-abb7d9dad73947cebd92d866d7f4c5ea?pvs=4'} target={'_blank'}>
              <button type={'button'} className={`${styles.footerButton}`}>
                {'FAQ'}
              </button>
            </Link>
          </div>
          <div className={`${styles.linkGroup}`}>
            <button type={'button'} className={`${styles.footerTitle}`}>
              {'서비스'}
            </button>
            <Link to={'https://034179.notion.site/e7421f1ad1064d2dbde0777d53766a7d?pvs=4'} target={'_blank'}>
              <button type={'button'} className={`${styles.footerButton}`}>
                {'이용약관'}
              </button>
            </Link>
            <Link to={'https://034179.notion.site/9ccf1d40d79e47ce8bb78e83d780c052'} target={'_blank'}>
              <button type={'button'} className={`${styles.footerButton}`}>
                {'개인정보처리방침'}
              </button>
            </Link>
          </div>
          <div className={`${styles.linkGroup}`}>
            <button type={'button'} className={`${styles.footerTitle}`}>
              {'KUniverse'}
            </button>
            <Link
              to={'https://harmonious-authority-301.notion.site/ASKu-9d6da8cb08e640db8f746524c231937e'}
              target={'_blank'}
            >
              <button type={'button'} className={`${styles.footerButton}`}>
                {'팀 소개'}
              </button>
            </Link>
            <Link to={'https://www.instagram.com/asku.wiki/'} target={'_blank'}>
              <button type={'button'} className={`${styles.footerButton}`}>
                {'인스타그램'}
              </button>
            </Link>
          </div>
          <div className={`${styles.logoWrap}`}>
            <img src={logoGray} alt={'logo_gray'} className={`${styles.logoGray}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
