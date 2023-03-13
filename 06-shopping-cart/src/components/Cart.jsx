import { useId } from 'react';

import { AddMoreProductIcon, CartIcon, ClearCartIcon } from './Icons';
import { useCart } from '../hooks/useCart';

const CartItem = ({ thumbnail, price, title, quantity, addToCart }) => {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>
          <AddMoreProductIcon />
        </button>
      </footer>
    </li>
  );
};

export const Cart = () => {
  const cartCheckboxId = useId();

  const { cart, addToCart, clearCart } = useCart();

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
          ))}
        </ul>

        <div className='button-clear'>
          <button onClick={clearCart}>
            <ClearCartIcon />
          </button>
        </div>
      </aside>
    </>
  );
};
