import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar 
      expand="lg"
      className="text-light py-3 mb-5" 
      style={{
        backgroundImage: `url("https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-Library-Wallpaper.jpg")`,  
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Overlay for readability */}
      <div 
        className="overlay" 
        style={{
          background: "rgba(0, 0, 0, 0.6)", 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%"
        }}
      ></div>

      <Container className="position-relative d-flex align-items-center">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <i className="fa-solid fa-book fa-bounce fa-2xl me-2" style={{ color: "gold" }}></i>
          <h2 className="fw-bold text-warning m-0" style={{ fontFamily: "serif" }}>Bookcollection</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;