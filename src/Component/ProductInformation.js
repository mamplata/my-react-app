// ProductInformation.js
import React from "react";

function ProductInformation({ id, name, price, description, addToSummary }) {
  const item = { id, name, price, description };
  return (
    <div className="card mb-3 text-center bg-light">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">Description: {description}</p>
        <button style={{width:"250px"}} className="btn btn-primary btn-md" onClick={() => addToSummary(id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductInformation;