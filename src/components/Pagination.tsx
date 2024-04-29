import React from 'react';
// @ts-expect-error TS(2307): Cannot find module './Pagination.module.css' or it... Remove this comment to see the full error message
import styles from './Pagination.module.css';

function Pagination({
  total,
  limit,
  page,
  setPage
}: any) {
  const numPages = Math.ceil(total / limit);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={styles.Nav}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button
          className={styles.Button}
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          &lt;&lt;
        </button>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button
          className={styles.Button}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array(numPages)
          // @ts-expect-error TS(2554): Expected 1-3 arguments, but got 0.
          .fill()
          .map((_, i) => (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button
              className={styles.Button}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </button>
          ))}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button
          className={styles.Button}
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
