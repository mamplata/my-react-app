import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewCart({ summary, setSummary }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/carts');
        const cartData = response.data;

        // Fetch product details for each item in the cart
        const updatedCartItems = await Promise.all(cartData.map(async (cartItem) => {
          const productDetails = await getProductDetails(cartItem.product_id);
          return {
            ...cartItem,
            name: productDetails.name,
            price: productDetails.price
          };
        }));

        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  async function getProductDetails(productId) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  }

  async function updateCartItem(cartId, newData) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/carts/${cartId}`, newData);
      const updatedCartItems = cartItems.map(item =>
        item.id === cartId ? { ...item, quantity: newData.quantity } : item
      );
      setCartItems(updatedCartItems);
      setSelectedCartItem(null); // Close the modal
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  }

  async function removeFromCart(index, cartId) {
    const confirmRemove = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmRemove) {
      setSummary(prevSummary => ({
        items: prevSummary.items.filter((_, i) => i !== index)
      }));
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      await axios.delete(`http://127.0.0.1:8000/api/removeCart/${cartId}`);
    }
  }

  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Cart Items:", cartItems);
    console.log("Total Price:", totalPrice);

    navigate('/checkout', {
      state: { cartItems, totalPrice }
    });
  };  

  return (
    <div className="mt-5 container py-5">
      <h1 className="text-center mb-4 fs-2">Your Shopping Cart</h1>
      <div className="text-center mb-4">
        <p className="mb-1">
          <strong>Total Items: {cartItems.length}</strong>
        </p>
        <p>
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => setSelectedCartItem(item)}>Update Quantity</button>
                <button className="btn btn-danger" onClick={() => removeFromCart(index, item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button 
          className="btn btn-primary btn-lg ps-5 pe-5 mb-3" 
          onClick={handleCheckout} 
          disabled={cartItems.length === 0} // Disable the button if cartItems.length is 0
        >
          Checkout
        </button>
      </div>
  
      {/* Modal for updating quantity */}
      {selectedCartItem && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Quantity</h5>
              </div>
              <div className="modal-body">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={modalQuantity}
                  onChange={(e) => setModalQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => updateCartItem(selectedCartItem.id, { quantity: modalQuantity })}>Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedCartItem(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}

export default ViewCart;
