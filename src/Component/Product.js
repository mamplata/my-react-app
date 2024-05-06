import React, { useState, useEffect } from "react";
import ProductInformation from "./ProductInformation";
import axios from "axios";

function Product({ summary, setSummary }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product for modal
  const [modalQuantity, setModalQuantity] = useState(1); // State for modal quantity

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  function addToSummary(productId) {
    setSelectedProductId(productId); // Set selected product for modal
  }

  function handleAddToCart() {
    if (selectedProductId !== null) {
      const updatedQuantities = { ...quantities };
      updatedQuantities[selectedProductId] = (updatedQuantities[selectedProductId] || 0) + modalQuantity;

      const requestBody = {
        product_id: selectedProductId,
        quantity: updatedQuantities[selectedProductId],
      };

      axios.post('http://127.0.0.1:8000/api/addToCart', requestBody)
        .then(response => {
          console.log('Item added to cart:', response.data);
          setSelectedProductId(null); // Reset selected product after adding to cart
          const { updated_quantity } = response.data;

          if (updated_quantity !== undefined) {
            // If the quantity was updated in the backend, update local state
            setQuantities(prevQuantities => ({
              ...prevQuantities,
              [selectedProductId]: updated_quantity,
            }));
          } else {
            // If a new item was added to the cart, update local state as before
            const productToAdd = products.find(product => product.id === selectedProductId);
            if (productToAdd) {
              setSummary(prevSummary => ({
                items: [...prevSummary.items, productToAdd]
              }));
            }
          }
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
    }
  }

  return (
    <div className="mt-5 mb-5 container">
      <h1 className="text-center my-5">Purchase the apparel that suits you best.<br /> Add to Cart Now!</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        {products.map(product => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary" onClick={() => setSelectedProductId(product.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* Modal for quantity selection */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: selectedProductId !== null ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Quantity</h5>
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
              <button type="button" className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedProductId(null)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Product;