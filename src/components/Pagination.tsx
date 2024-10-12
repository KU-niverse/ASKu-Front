import React from 'react'
import styles from './Pagination.module.css'
import leftDoubleArrow from '../img/left-double-arrow.svg'
import leftArrow from '../img/left-arrow.svg'

interface PaginationProps {
  total: number
  limit: number
  page: number
  setPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit)

  const goToFirst = () => {
    setPage(1)
    window.scrollTo(0, 0)
  }

  const goToLeft = () => {
    setPage(page - 1)
    window.scrollTo(0, 0)
  }

  const goToRight = () => {
    setPage(page + 1)
    window.scrollTo(0, 0)
  }

  const goToLast = () => {
    setPage(numPages)
    window.scrollTo(0, 0)
  }

  const goToNum = (n: number) => {
    setPage(n)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.Nav}>
      <button type={'button'} className={styles.Button} onClick={goToFirst} disabled={page === 1}>
        <img src={leftDoubleArrow} alt={'왼쪽 더블 화살표'} />
      </button>
      <button type={'button'} className={styles.Button} onClick={goToLeft} disabled={page === 1}>
        <img src={leftArrow} alt={'왼쪽 화살표'} style={{ marginRight: '22px' }} />
      </button>
      <div className={styles.Numbers}>
        {Array.from({ length: numPages }, (_, i) => (
          <button
            type={'button'}
            className={styles.Button}
            key={i + 1}
            onClick={() => goToNum(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button type={'button'} className={styles.Button} onClick={goToRight} disabled={page === numPages}>
        <img src={leftArrow} alt={'오른쪽 화살표'} style={{ transform: 'rotate(180deg)', marginLeft: '22px' }} />
      </button>
      <button type={'button'} className={styles.Button} onClick={goToLast} disabled={page === numPages}>
        <img src={leftDoubleArrow} alt={'오른쪽 더블 화살표'} style={{ transform: 'rotate(180deg)' }} />
      </button>
    </div>
  )
}

export default Pagination
