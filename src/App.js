import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./Component/Product";
import ViewCart from "./Component/ViewCart";
import Checkout from "./Component/CheckOut";
import CompleteOrder from "./Component/CompleteOrder";
import Home from "./Home";
import Footer from "./Footer";
import Navigation from "./Navigation";
import './App.css';

function App() {
  const [summary, setSummary] = useState({ items: [] });
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product summary={summary} setSummary={setSummary} />} />
          <Route path="/cart" element={<ViewCart summary={summary} setSummary={setSummary} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/complete-order" element={<CompleteOrder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
