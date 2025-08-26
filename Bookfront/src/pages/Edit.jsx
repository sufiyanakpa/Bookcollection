import React, { useState, useEffect } from 'react';
import { updateBookApi, getBookByApi } from '../AllApiServices/allApis';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditBook() {
  const [book, setBook] = useState({
    Title: '',
    Author: '',
    Book_id: '', 
    year: '',
   
    Genre: '',
    image: null,
  });

  const [existingImage, setExistingImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const result = await getBookByApi(id);
      if (result.status === 200) {
        setBook({
          Title: result.data.Title,
          Author: result.data.Author,
          Book_id: result.data.Book_id,
          year: result.data.year,
          Genre: result.data.Genre,
          image: null, // We set image to null because the existing image URL is handled separately
        });
        setExistingImage(result.data.image);
      } else {
        alert("Failed to fetch book details.");
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      alert("Error fetching book details. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
     const { Title, Author, Book_id, year, Genre, image } = book;

if (!Title || !Author || !Book_id || !year || !Genre) {
  alert("Please fill in all fields.");
  return;
}

const formData = new FormData();
formData.append("Title", Title);
formData.append("Author", Author);
formData.append("Book_id", Book_id);
formData.append("year", year);
formData.append("Genre", Genre);

if (image instanceof File) {
  formData.append("image", image);
}

      const result = await updateBookApi(id, formData);

      if (result.status === 200) {
        toast.success("Book details updated successfully!");
        navigate("/dash");
      } else {
        alert("Update failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
      alert("Failed to update book. Please try again.");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "70vh" }}>
      <div className='border shadow p-3 w-50'>
        <h2>Edit Book</h2>

        <input
          type="text"
          placeholder='Enter Book Title'
          value={book.Title}
          onChange={(e) => setBook({ ...book, Title: e.target.value })}
          className='form-control mb-3'
        />
        <input
         type="number"
         placeholder="Enter Book ID"
         value={book.Book_id}
         onChange={(e) => setBook({ ...book, Book_id: e.target.value })}
         className="form-control mb-3"
        />

        <input
          type="text"
          placeholder='Enter Author'
          value={book.Author}
          onChange={(e) => setBook({ ...book, Author: e.target.value })}
          className='form-control mb-3'
        />

        <input
          type="number"
          placeholder='Enter Publishing Year'
          value={book.year}
          onChange={(e) => setBook({ ...book, year: e.target.value })}
          className='form-control mb-3'
        />

        <input
          type="text"
          placeholder='Enter Genre'
          value={book.Genre}
          onChange={(e) => setBook({ ...book, Genre: e.target.value })}
          className='form-control mb-3'
        />

        {existingImage && (
          <div className="mb-3">
            <p>Current Image:</p>
            <img src={`http://localhost:8000${existingImage}`} alt="Book" width="150" />
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setBook({ ...book, image: e.target.files[0] })}
          className='form-control mb-3'
        />

        <div className='d-flex justify-content-between'>
          <button className='btn btn-success' onClick={handleUpdate}>Update</button>
          <Link to={"/dash"} className='btn btn-danger'>Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default EditBook;