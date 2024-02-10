import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 5 || isMenuOpen) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={changeColor ? "color-active" : ""}
        expanded={isMenuOpen}
      >
        <Container>
          <Navbar.Brand
            href="/"
            className="fw-bold fs-4"
          >
            ahmadzidni.site
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleMenuToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto text-center">
              <div className="nav-link">
                <NavLink
                  to={"/"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Home
                </NavLink>
              </div>
              {/* <div className="nav-link">
                <NavLink
                  to={'/gallery-project'}
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                >
                  Gallery
                </NavLink>
              </div> */}
              <div className="nav-link">
                <NavLink
                  to={"/Alquran/ayat"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Alquran
                </NavLink>
              </div>
              <div className="nav-link">
                <NavLink
                  to={"/Jadwalsholat/listkota"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Jadwal Sholat
                </NavLink>
              </div>
              <div className="nav-link">
                <NavLink
                  to={"/Asmaulhusna"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Asmaul Husna
                </NavLink>
              </div>
            </Nav>
            <div className="text-center fs-3">
              <a
                className="text-black"
                href="https://www.youtube.com/@madzchannel3399"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
