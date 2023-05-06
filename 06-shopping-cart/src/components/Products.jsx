import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { useCart } from '../hooks/useCart';

export const Products = ({ products }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id);
  };

  return (
    <main className='products'>
      <ul>
        {products.map(product => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                  onClick={() => {
                    isProductInCart ? removeFromCart(product) : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
