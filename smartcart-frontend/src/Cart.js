import React, { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch cart data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cart/")
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
      })
      .catch(err => console.log("Error:", err));
  }, []);

  // ✅ Remove item
  const removeItem = (id) => {
    fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setCartItems(prev =>
          prev.filter(item => item.id !== id)
        );
      })
      .catch(err => console.log(err));
  };

  // ✅ Increase quantity
  const increaseQuantity = (id, currentQty, productId) => {
    fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity: currentQty + 1
      })
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, quantity: data.quantity }
              : item
          )
        );
      })
      .catch(err => console.log(err));
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (id, currentQty) => {
    if (currentQty <= 1) return;

    fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: currentQty - 1
      })
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, quantity: data.quantity }
              : item
          )
        );
      })
      .catch(err => console.log(err));
  };

  // ✅ Total price
  const total = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.product_price;
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="card p-3 mb-3 shadow-sm">

              <h4>{item.product_name}</h4>
              <p>Price: ₹{item.product_price}</p>
              <p>Quantity: {item.quantity}</p>

              <div className="d-flex gap-2 mt-2">

                <button
                  className="btn btn-outline-dark"
                  onClick={() =>
                    increaseQuantity(item.id, item.quantity, item.product)
                  }
                >
                  Increase ➕
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    decreaseQuantity(item.id, item.quantity)
                  }
                >
                  Decrease ➖
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove ✖
                </button>

              </div>

            </div>
          ))}

          {/* ✅ Total */}
          <h3 style={{ textAlign: "right" }}>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;