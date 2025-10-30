import "../style/home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const formatData = (books) =>
    books.map((book, i) => ({
    bookId: book.key ? book.key.split('/')[2] : null, // Check if key exists before splitting
    title: book.title,
    isbn: book.cover_edition_key || (book.edition_key && book.edition_key[0]) || null,
  }));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://openlibrary.org/trending/day.json?&limit=10');
        const data = await res.json();
        console.log("data: ", data["works"]);
        const formattedData = formatData(data.works || []);
        setBooks(formattedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
       setError('We were unable to load trending books. Please try again later.');
      }
      setIsLoading(false);
    };
  
    fetchData(); // Fetch data once when the component mounts
  
  }, []);

  return (
    <div className="home">
      <h1>What do you want to Read Today</h1>
      <h2 className="trendy-tag">Top Trending Books of Today</h2>
      {isLoading && <p className="loading-message">Loading the latest books…</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="books-container">
         {books
          .filter((book) => book.isbn !== undefined && book.isbn !== null)
          .map(book => (
          <div key={book.isbn} className="book-card">
            <Link to={`/books/${book.isbn}`}>
              <img
                src={`https://covers.openlibrary.org/b/olid/${book.isbn}-M.jpg`}
                alt={book.title}
                loading="lazy"
              />
            </Link>
            <h3 className="book-title">{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
