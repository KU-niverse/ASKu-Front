import React from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
  total: number
  limit: number
  page: number
  setPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit)

  return (
    <div className={styles.Nav}>
      <button type={'button'} className={styles.Button} onClick={() => setPage(1)} disabled={page === 1}>
        &lt;&lt;
      </button>
      <button type={'button'} className={styles.Button} onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array.from({ length: numPages }, (_, i) => (
        <button
          type={'button'}
          className={styles.Button}
          key={i + 1}
          onClick={() => setPage(i + 1)}
          aria-current={page === i + 1 ? 'page' : undefined}
        >
          {i + 1}
        </button>
      ))}
      <button type={'button'} className={styles.Button} onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
      <button type={'button'} className={styles.Button} onClick={() => setPage(numPages)} disabled={page === numPages}>
        &gt;&gt;
      </button>
    </div>
  )
}

export default Pagination
