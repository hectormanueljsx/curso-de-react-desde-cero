import { useCallback, useState } from 'react';
import debounce from 'just-debounce-it';

import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import './App.css';

export const App = () => {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search });
    }, 500),
    [getMovies],
  );

  const handleSubmit = e => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = event => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className='app'>
      <header className='header'>
        <h1>Buscador de Películas</h1>

        <form className='form' onSubmit={handleSubmit}>
          <div>
            <input
              style={{ borderColor: error ? 'red' : '#0096bfab' }}
              type='text'
              value={search}
              onChange={handleChange}
              placeholder='Avengers, Star Wars, The Matrix...'
              autoFocus
            />
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main className='main'>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
};
