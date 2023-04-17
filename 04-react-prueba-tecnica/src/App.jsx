import { useCatFact } from './hooks/useCatFact';
import { useCatImage } from './hooks/useCatImage';
import './App.css';

export const App = () => {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main className='app'>
      <h1>App de Gatitos</h1>

      <button onClick={handleClick}>Get new fact</button>

      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first rhee words for ${fact}`} />}
      </section>
    </main>
  );
};
