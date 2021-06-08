import React, { useEffect, useState } from 'react';
import { moviesAPI } from '../../utils/API';
import { App } from '../App/App';

export const AppContext = React.createContext({});

export const Provider = () => {
  const [moviesList, setMoviesList] = useState({});

  useEffect(() => {
    if (Object.keys(moviesList).length !== 0) {
      return;
    }
    const fetchMovies = async () => {
      const list = await moviesAPI.getList();

      setMoviesList(list);
    };
    fetchMovies();
  }, [
    moviesList,
  ]);

  return (
    <AppContext.Provider
      value={{
        moviesList,
      }}
    >
      <App />
    </AppContext.Provider>
  );
};
