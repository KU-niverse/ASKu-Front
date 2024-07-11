import { useState, useEffect } from 'react'
import Pagination from './Pagination'

function Posts() {
  const [posts, setPosts] = useState([])
  const limit = 6
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  return (
    <div>
      <header>
        <h1>{'게시물 목록'}</h1>
      </header>

      <main>
        {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}
              {'. '}
              {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>

      <footer>
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage} />
      </footer>
    </div>
  )
}

export default Posts
