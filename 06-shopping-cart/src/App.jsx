import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { useFilters } from './hooks/useFilters';
import { CartProvider } from './context/cart';
import { products as initialProducts } from './mocks/products.json';
import { IS_DEVELOPMENT } from './config';
import './App.css';

export const App = () => {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
};
