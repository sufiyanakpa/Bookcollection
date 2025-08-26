import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const nav = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    nav("/");
  };

  return (
    <div
      className="container-fluid text-light py-5 d-flex align-items-center justify-content-center mt-5"
      style={{
        backgroundImage: `url("https://wallpapercave.com/wp/WOAttEL.jpg")`, 
        backgroundSize: "cover",  // Show full image without cropping
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",  // Ensure full screen height
        position: "relative",
      }}
    >
      <div 
        className="overlay" 
        style={{ background: "rgba(0, 0, 0, 0.6)", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      ></div>

      <Row className="position-relative w-100 text-center">
        {/* Library Info */}
        <Col sm={12} md={6}>
          <h2 className="fw-bold text-warning">My Book Collections</h2>
          <p className="mt-3 fs-5">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."  
          </p>
          <p className="fs-6">– George R.R. Martin</p>
          <p className="fs-5">
            "The only thing that you absolutely have to know, is the location of the library."
          </p>
          <p className="fs-6">– Albert Einstein</p>
        </Col>

        {/* Links & Logout */}
        <Col sm={12} md={6} className="d-flex flex-column align-items-center">
          <h4 className="fw-bold text-warning">Quick Links</h4>
          <p>
            <Link className="text-light text-decoration-none fs-5" to={"/reg"}>
              <i className="fa-solid fa-user-plus"></i> Sign Up
            </Link>
          </p>
          <p>
            <Link className="text-light text-decoration-none fs-5" to={"/"}>
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </Link>
          </p>
          <button className="btn btn-outline-light mt-3 px-4 py-2 fs-5" onClick={logout}>
            <i className="fa-solid fa-sign-out-alt"></i> Logout
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
