import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faWhatsapp,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white text-center p-3 w-100">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon
                icon={faFacebookF}
                style={{ color: "#fbb02d", fontSize: "16px" }}
              />
            </a>

            <a
              href="https://wa.me/201127281299"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none me-4"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{ color: "#fbb02d", fontSize: "16px" }}
              />
            </a>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#fbb02d", fontSize: "16px" }}
              />
            </a>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ color: "#fbb02d", fontSize: "16px" }}
              />
            </a>
            <a href="#" className="me-4 text-reset">
              <FontAwesomeIcon
                icon={faGithub}
                style={{ color: "#fbb02d", fontSize: "16px" }}
              />
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <Link
                  className="text-uppercase fw-bold mb-4"
                  style={{
                    color: "#fbb02d",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="/"
                >
                  Readify
                  <img
                    src={logo}
                    alt="Readify Logo"
                    style={{ width: "30px", height: "30px", marginLeft: "8px" }}
                  />
                </Link>

                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link to="/allbooks" className="text-reset">
                    Story
                  </Link>
                </p>
                <p>
                  <Link to="/allbooks" className="text-reset">
                    Book
                  </Link>
                </p>
                <p>
                  <Link to="/allbooks" className="text-reset">
                    Fantasy
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Cairo Egypt
                </p>
                <a
                  href="mailto:rahmamedhat503@gmail.com"
                  className="text-decoration-none"
                  style={{ color: "#fbb02d", fontSize: "16px" }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="me-2 text-reset"
                  />
                  rahmamedhat503@gmail.com
                </a>

                <p>
                  <i className="fas fa-phone me-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Copyright:
          <Link className="text-reset fw-bold" to="/">
            Readify
          </Link>
        </div>
      </footer>
    </div>
  );
}
