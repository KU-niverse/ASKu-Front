import React from 'react';
import styles from './Pagination.module.css';

function Pagination({
  total,
  limit,
  page,
  setPage
}: any) {
  const numPages = Math.ceil(total / limit);

  return (
        <>
            <div className={styles.Nav}>
                <button
          className={styles.Button}
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          &lt;&lt;
        </button>
                <button
          className={styles.Button}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array(numPages)
                    .fill()
          .map((_, i) => (
                        <button
              className={styles.Button}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </button>
          ))}
                <button
          className={styles.Button}
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
                <button
          className={styles.Button}
          onClick={() => setPage(numPages)}
          disabled={page === numPages}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
}

export default Pagination;
