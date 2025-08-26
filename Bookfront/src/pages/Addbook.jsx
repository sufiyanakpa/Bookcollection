import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getBookApi, DeleteBooksApi } from '../AllApiServices/allApis';
import { Link, useNavigate } from 'react-router-dom';
import Addbooks from '../components/Addbooks';
import { toast } from 'react-toastify';

function Addbook() {
  const [books, setBook] = useState([]);
  const [addResponse, setAddresponse] = useState('');
  const navigate = useNavigate();

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

  // New function to navigate to Edit page
  const goToEditPage = (id) => {
    navigate(`/edit/${id}`);
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
                        <Card.Text><strong>{item.Author}</strong></Card.Text>
                        <Card.Text><strong>{item.Genre}</strong></Card.Text>
                        <div className='d-flex justify-content-center gap-2'>
                          {/* Navigate to Edit.jsx */}
                          <Button
                            onClick={() => goToEditPage(item.id)}
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
    </>
  );
}

export default Addbook;