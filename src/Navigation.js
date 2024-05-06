import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./img/apparelLogo.png";

function Navigation() {
  return (
    <header className="bg-info d-flex justify-content-between align-items-center">
      <Link to="/"><img width={100} src={logo} alt="Company Logo" className="m-3"/></Link>
      <nav className="d-flex justify-content-between align-items-center me-5 text-decoration-none">
        <ul className="list-unstyled text-decoration-none d-flex fs-2 fw-bold">
          <li className="me-4"><Link to="/">Home</Link></li>
          <li><Link to="/cart">My Cart</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
