import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function generateRefId() {
  // Generate a random string of length 8
  return Math.random().toString(36).substring(2, 10);
}

function CompleteOrder() {
  const navigate = useNavigate();
  const refId = generateRefId(); // Generate a random refId

  const { state } = useLocation();
  const { shippingDetails, cartItems, totalPrice } = state;

  const goHome = () => {
    navigate("/");
  };

  const removeAllCarts = () => {
    axios.delete("http://127.0.0.1:8000/api/carts")
      .then(response => {
        console.log(response.data); // Log success message
      })
      .catch(error => {
        console.error("Error removing carts:", error);
      });
  };

  // Call removeAllCarts when the component mounts
  React.useEffect(() => {
    removeAllCarts();
  }, []);

  return (
    <div className="mt-5 container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <h1 className="text-center mb-4 fs-2">Complete Order</h1>
            <div>
              <h2>Shipping Details</h2>
              <p><strong>Name:</strong> {shippingDetails.name}</p>
              <p><strong>Address:</strong> {shippingDetails.address}</p>
              <p><strong>City:</strong> {shippingDetails.city}</p>
              <p><strong>Postal Code:</strong> {shippingDetails.postalCode}</p>
              <p><strong>Phone:</strong> {shippingDetails.phone}</p>
              {/* Add more shipping details fields as needed */}
            </div>
            <div>
              <h2>Order Summary</h2>
              <p><strong>Reference ID:</strong> {refId}</p>
              <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <button className="btn btn-primary mt-4 px-4 py-2" onClick={goHome}>Go Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default CompleteOrder;
