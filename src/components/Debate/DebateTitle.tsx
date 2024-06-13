import styles from './DebateTitle.module.css'
import debate from '../../img/debate.png'

interface DebateTitleProps {
  title: string
  subject: string
}

function DebateTitle({ title, subject }: DebateTitleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.headline}>{title}</span>
        <span className={styles.headline2}>&nbsp;{'문서 기반 토론'}</span>
      </div>
      <div className={styles.content}>
        <img src={debate} alt={'debate'} />
        <span className={styles.part}>&nbsp;{subject}</span>
        <span className={styles.part2}>{'에 대해서'}</span>
      </div>
    </div>
  )
}

export default DebateTitle
