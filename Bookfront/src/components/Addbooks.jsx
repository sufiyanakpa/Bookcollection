import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addBookApi } from '../AllApiServices/allApis';
import { Button } from 'react-bootstrap';

function Addbooks({ setAdd, existingBookIds = [] }) {
  const [show, setShow] = useState(false);
  const [Book, setBook] = useState({
    Title: "",
    Author: "",
    Book_id: "",
    year: "",
    Genre: ""
  });
  const [file, setFile] = useState("");

  const handleAdd = async () => {
    const { Title, Author, Book_id, year, Genre } = Book;

   
    if (!Title || !Author || !Book_id || !year || !Genre || !file) {
      toast.warning("Please fill in all fields");
      return;
    }

   
    if (existingBookIds.includes(parseInt(Book_id, 10))) {
      toast.error("Book ID already exists. Please use a unique Book ID.");
      return;
    }

    try {
      const bookData = new FormData();
      bookData.append("Title", Title);
      bookData.append("Author", Author);
      bookData.append("Book_id", parseInt(Book_id, 10));
      bookData.append("year", parseInt(year, 10));
      bookData.append("Genre", Genre);

      if (file instanceof Blob) {
        bookData.append("image", file);
      } else {
        toast.error("Please select a valid image file.");
        return;
      }

      const result = await addBookApi(bookData);

      if (result.status === 201) {
        toast.success("Book added successfully");
        handleClose();
        setBook({ Title: "", Author: "", Book_id: "", year: "", Genre: "" });
        setFile("");
        setAdd(result);
      } else {
        toast.error("Failed to add book");
      }
    } catch (err) {
      console.error(err);
      // Handle backend validation errors (e.g., duplicate Book_id)
      if (err.response && err.response.data && err.response.data.Book_id) {
        toast.error(`Book ID error: ${err.response.data.Book_id.join(", ")}`);
      } else {
        toast.warning("Something went wrong");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="btn my-3"
        style={{
          color: "#3A2375",
          background: "linear-gradient(135deg, #FFD700, #FFEC8B)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          transition: "0.3s ease-in-out",
          fontWeight: "bold",
          border: "none"
        }}
        onClick={handleShow}
      >
        Add New Book +
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Title"
            value={Book.Title}
            onChange={(e) => setBook({ ...Book, Title: e.target.value })}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Author"
            value={Book.Author}
            onChange={(e) => setBook({ ...Book, Author: e.target.value })}
          />
          <input
            type="number"
            className="form-control my-2"
            placeholder="Enter Book ID"
            value={Book.Book_id}
            onChange={(e) => setBook({ ...Book, Book_id: e.target.value })}
          />
          <input
            type="number"
            className="form-control my-2"
            placeholder="Enter Year"
            value={Book.year}
            onChange={(e) => setBook({ ...Book, year: e.target.value })}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Genre"
            value={Book.Genre}
            onChange={(e) => setBook({ ...Book, Genre: e.target.value })}
          />
          <div className="d-flex align-items-center">
            <label className="mr-2">Book Image</label>
            <input
              type="file"
              className="form-control w-75"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addbooks;