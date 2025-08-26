import React, { useEffect, useState } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { getBookApi, DeleteBooksApi, updateBookApi } from '../AllApiServices/allApis';
import { Link } from 'react-router-dom';
import Addbooks from '../components/Addbooks';
import { toast } from 'react-toastify';

function Addbook() {
  const [books, setBook] = useState([]);
  const [addResponse, setAddresponse] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [file, setFile] = useState(null);
  const [editData, setEditData] = useState({
    Title: '',
    Author: '',
    Book_id: '',
    year: '',
    Genre: ''
  });

  useEffect(() => {
    getData();
  }, [addResponse]);

  const getData = async () => {
    const result = await getBookApi();
    if (result.status === 200) {
      setBook(result.data);
    }
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this book?");
  
  if (!confirmDelete) return;

  const result = await DeleteBooksApi(id);
  if (result.status === 204) {
    toast.success("Book deleted successfully");
    getData();
  } else {
    toast.error("Something went wrong");
  }
};

  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditData({
      Title: book.Title,
      Author: book.Author,
      Book_id: book.Book_id,
      year: book.year,
      Genre: book.Genre
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    const data = new FormData();
    data.append("Title", editData.Title);
    data.append("Author", editData.Author);
    data.append("Book_id", editData.Book_id);
    data.append("year", editData.year);
    data.append("Genre", editData.Genre);

    if (file) {
      data.append("image", file);
    }

    const result = await updateBookApi(selectedBook.id, data);

    if (result.status === 200) {
      toast.success("Book updated successfully");
      setShowEditModal(false);
      setFile(null);
      getData();
    } else {
      toast.error("Failed to update book");
    }
  };

  return (
    <>
      <div className='container p-4'>
        <h1 className='fw-bold text-warning' style={{ color: "#B195D2" }}>Books</h1>
        <div className='d-flex justify-content-between'>
          <Addbooks setAdd={setAddresponse} />
          <Link to={'/dash'}>
            <i className="fa-solid fa-arrow-left fa-lg" style={{ color: "#B195D2" }}></i>
          </Link>
        </div>

        <div className='border shadow p-3 card shadow-lg rounded-lg p-4 mb-3'>
          {
            books.length > 0 ? (
              <div className='row p-2 mt-2 gap-3'>
                {
                  books.map(item => (
                    <Card key={item.id} style={{ width: '18rem' }} className="shadow-lg p-3 mb-4">
                      <Card.Img variant="top" src={item.image} height={200} style={{ objectFit: "cover" }} />
                      <Card.Body>
                        <Card.Title>{item.Title}</Card.Title>
                        <Card.Text>
                          <strong>{item.Author}</strong> 
                        </Card.Text>
                        <Card.Text>
                          <strong>{item.Genre}</strong> 
                        </Card.Text>
                        <div className='d-flex justify-content-center gap-2'>
                          <Button
                            onClick={() => openEditModal(item)}
                            style={{
                              color: "#3A2375",
                              background: "linear-gradient(135deg, #FFD700, #FFEC8B)",
                              borderRadius: "10px",
                              fontWeight: "bold",
                              border: "none",
                              padding: "6px 15px"
                            }}>
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            style={{
                              color: "#3A2375",
                              background: "linear-gradient(135deg, #FFD700, #FFEC8B)",
                              borderRadius: "10px",
                              fontWeight: "bold",
                              border: "none",
                              padding: "6px 15px"
                            }}>
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                }
              </div>
            ) : (
              <h2>No Books</h2>
            )
          }
        </div>
      </div>

      
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" type="text" placeholder="Title"
              value={editData.Title} onChange={(e) => setEditData({ ...editData, Title: e.target.value })} />
            <Form.Control className="mb-2" type="text" placeholder="Author"
              value={editData.Author} onChange={(e) => setEditData({ ...editData, Author: e.target.value })} />
            <Form.Control className="mb-2" type="number" placeholder="Book ID"
              value={editData.Book_id} onChange={(e) => setEditData({ ...editData, Book_id: e.target.value })} />
            <Form.Control className="mb-2" type="number" placeholder="Year"
              value={editData.year} onChange={(e) => setEditData({ ...editData, year: e.target.value })} />
            <Form.Control className="mb-2" type="text" placeholder="Genre"
              value={editData.Genre} onChange={(e) => setEditData({ ...editData, Genre: e.target.value })} />

            <Form.Control className="mb-2" type="file"
              onChange={(e) => setFile(e.target.files[0])} />

            
            {selectedBook?.image && (
              <div className="mt-2 text-center">
                <img
                  src={selectedBook.image}
                  alt="Current"
                  height={100}
                  style={{ objectFit: "cover" }}
                />
                <p className="text-muted mt-1">Current Image</p>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addbook;