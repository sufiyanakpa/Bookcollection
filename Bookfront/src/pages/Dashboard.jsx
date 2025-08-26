import React, { useState, useEffect } from 'react';
import { getBookApi } from '../AllApiServices/allApis'; 
import { Link } from 'react-router-dom';

function Dash() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const result = await getBookApi();
      if (result.status === 200) {
        setBooks(result.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  
const filteredBooks = books.filter(book =>
  book.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.Book_id.toString().includes(searchQuery)
);

  return (
    <div className="container mt-5">
      
     
      <div className="text-center mb-4">
        <Link style={{
          color: "#3A2375",
          background: "linear-gradient(135deg, #FFD700, #FFEC8B)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          transition: "0.3s ease-in-out",
          fontWeight: "bold",
          border: "none"
        }}
          to="/book"
        >
           Add New Book
        </Link>
      </div>

    
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Book title or Book id..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

     
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.id}</td>
                <td>{book.Book_id}</td>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>{book.year}</td>
                <td>{book.Genre}</td>
                <td>
                  {book.image ? (
                    <img
                      src={book.image}
                      alt="Book Cover"
                      style={{ width: "80px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No books found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dash;