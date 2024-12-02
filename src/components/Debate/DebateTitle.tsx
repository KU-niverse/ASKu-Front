import styles from './DebateTitle.module.css'
import speaker from '../../img/speaker.svg'

interface DebateTitleProps {
  title: string
  subject: string
}

function DebateTitle({ title, subject }: DebateTitleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={speaker} alt={'speaker'} />
        <span className={styles.part}>
          &nbsp;{subject}
          {'에 대해서'}
        </span>
      </div>
    </div>
  )
}

export default DebateTitle
