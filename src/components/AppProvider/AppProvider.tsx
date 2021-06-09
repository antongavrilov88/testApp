/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { CircularProgress, Typography } from '@material-ui/core';
import { moviesAPI } from '../../utils/API';
import { MovieList } from '../MovieList/MovieList';

type Context = {
  moviesList: any[],
  setMoviesList: ((arg: any) => void) | any,
  markedMovies: boolean[] | any
  setMarkedMovies: ((arg: any) => void) | any,
};

const initContext: Context = {
  moviesList: [],
  setMoviesList: () => null,
  markedMovies: [],
  setMarkedMovies: () => null,
};

export const AppContext = React.createContext(initContext);

export const AppProvider = () => {
  const initList: any = [];

  const getMarkedMovies = () => {
    const initMarkedMoviesList: string[] = [];
    for (const key in localStorage) {
      initMarkedMoviesList.push(key);
    }
    return initMarkedMoviesList;
  };
  const [moviesList, setMoviesList] = useState(initList);
  const [markedMovies, setMarkedMovies] = useState(getMarkedMovies());

  useEffect(() => {
    if (moviesList.length !== 0) {
      return;
    }
    const fetchMovies = async () => {
      const listPages: any[] = [];
      let i = 1;
      while (i <= 25) {
        const page = await moviesAPI.getList(i);
        listPages.push(page.results);
        i++;
      }
      const listMovies: any = [];
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
        markedMovies,
        setMarkedMovies,
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box textAlign="center">
          <Typography variant="h2" color="primary" gutterBottom>
            Test app - 500 TopRated movies
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box>
            {moviesList.length !== 0 ? <MovieList />
              : <CircularProgress />}
          </Box>
        </Box>
      </Box>
    </AppContext.Provider>
  );
};

export const useAppProvider = () => useContext(AppContext);
