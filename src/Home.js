import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Home() {
  return (
    <div className="mt-5 container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-lg-8" style={{ animation: 'fadeIn 1s ease-in' }}>
          <h1 className="text-center">Welcome to Our Apparel Shop Website!</h1>
          <p className="text-center fs-5" style={{ animation: 'slideIn 1s ease-in-out' }}>
            "Welcome to our apparel shop! Step into a world where style meets comfort, and where you can find the perfect outfit for any occasion. Whether you're looking for casual wear for everyday adventures or sophisticated attire for special events, we have something for everyone. Explore our curated selection of high-quality garments, designed to elevate your wardrobe and reflect your unique sense of fashion. With a focus on both style and sustainability, we strive to offer clothing that not only looks good but also feels good to wear. Our knowledgeable staff is here to assist you in finding the perfect pieces to express your personal style. Come on in and discover your next favorite outfit!"
          </p>
          <div className="text-center mt-5 mb-5">
            <Link to="/products" className="btn btn-primary btn-lg border" style={{ fontSize: "24px" }}>Proceed to Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
