import Link from 'next/link'
import { client } from '@/lib/db'

const getBooks = async () => {

  await client.connect();
  // getting scores of all sorted sets.
  const result = await client.zRangeWithScores('books', 0, -1); // from start to end.

  // creating pipelines to get each book based on score (id).
  const books = await Promise.all(result.map((item) => {
    return client.hGetAll(`books:${item.score}`);
  }));

  return books;
}

export default async function Home() {

  const books = await getBooks();

  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>
      
      {books.map((book) => (
        <div key={book.title} className='card'>
          <h2>{book.title}</h2>
          <p>By {book.author}</p>
          <p>{book.blurb}</p>
          <p>Rating: {book.rating}</p>
        </div>
      ))}
    </main>
  )
}
