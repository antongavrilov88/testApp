import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { moviesAPI } from '../../utils/API';
import { MovieList } from '../MovieList/MovieList';
// eslint-disable-next-line import/no-cycle

const useStyles = makeStyles(
  {
    h1: {
      color: '#27aedb',
      textAlign: 'center',
    },
  },
);

export function App() {
  const initList: any = [];
  const classes = useStyles();
  const [moviesList, setMoviesList] = useState(initList);

  useEffect(() => {
    if (moviesList.length !== 0) {
      return;
    }
    const fetchMovies = async () => {
      const listPages: any = [];
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
    <>
      <Box>
        {console.log(moviesList)}
        <div className={classes.h1}>TEST APP</div>
      </Box>
      {moviesList.length !== 0 && <MovieList movies={moviesList} />}
    </>
  );
}
