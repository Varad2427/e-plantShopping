
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getPrice = (item) =>
    parseFloat(String(item.cost).replace(/[^0-9.]/g, '')) || 0;

  const calculateTotalAmount = () =>
    items.reduce(
      (total, item) => total + getPrice(item) * item.quantity,
      0
    );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <main className="cart-container">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit price: {item.cost}</p>
                <p>
                  Quantity: {item.quantity}
                </p>

                <div className="cart-item-quantity">
                  <button
                    type="button"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: ${(getPrice(item) * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}

          <h2>
            Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
          </h2>
        </>
      )}

      <div className="continue_shopping_btn">
        <button
          type="button"
          className="get-started-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>

        <button
          type="button"
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </main>
  );
}

export default CartItem;
