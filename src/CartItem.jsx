import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      total += itemCost * item.quantity;
    });

    return total.toFixed(2);
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity
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

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return (itemCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div className="cart-buttons">
        <button onClick={handleContinueShopping}>
          Continue Shopping
        </button>

        <button onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} width="100" />

          <h3>{item.name}</h3>
          <p>Price: {item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ${calculateTotalCost(item)}</p>

          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => handleRemove(item)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;  