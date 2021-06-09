/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { moviesAPI } from '../../utils/API';
import { MovieList } from '../MovieList/MovieList';

type Context = {
  moviesList: any[],
  setMoviesList: ((arg: any) => void) | any
};

const initContext: Context = {
  moviesList: [],
  setMoviesList: () => null,
};

export const AppContext = React.createContext(initContext);

const useStyles = makeStyles(
  {
    h1: {
      color: '#27aedb',
      textAlign: 'center',
    },
    content: {
      width: '75%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
);

export const AppProvider = () => {
  const classes = useStyles();
  const initList: any = [];
  const [moviesList, setMoviesList] = useState(initList);

  useEffect(() => {
    if (moviesList.length !== 0) {
      return;
    }
    const fetchMovies = async () => {
      const listPages: any[] = [];
      let i = 1;
      while (i <= 25) {
        // eslint-disable-next-line no-await-in-loop
        const page = await moviesAPI.getList(i);
        listPages.push(page.results);
        // eslint-disable-next-line no-plusplus
        i++;
      }
      const listMovies: any = [];
      // eslint-disable-next-line array-callback-return
      listPages.map((page) => {
        page.map((movie) => listMovies.push(movie));
      });
      setMoviesList(listMovies);
    };
    fetchMovies();
  }, [
    moviesList,
  ]);

  return (
    <AppContext.Provider
      value={{
        moviesList,
        setMoviesList,
      }}
    >
      <Box className={classes.content}>
        <Box>
          {moviesList.length !== 0 && <MovieList />}
        </Box>
      </Box>
    </AppContext.Provider>
  );
};

export const useAppProvider = () => useContext(AppContext);
