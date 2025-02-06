import React from "react";
import "./AboutUs.css"; // Import the external CSS file
import { Link } from "react-router-dom";
export default function AboutUs() {
  return (
    <section className="about-us-container">
   
      <div className="about-us-bg"></div>

      
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          Welcome to <span className="highlight">Readify book store</span>, where every book tells a story and every reader finds inspiration.
          We curate a diverse collection, from timeless classics to the latest bestsellers.
        </p>

        <p>
          Our passion for literature drives us to create a welcoming space for book lovers.
          Whether you’re looking for fiction, non-fiction, or academic books, we’ve got you covered.
        </p>

        <Link to="/allbooks" className="cta-button">
          Explore Our Collection
        </Link>
      </div>
    </section>
  );
}
