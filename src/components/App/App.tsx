import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { moviesAPI } from '../../utils/API';
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
  const classes = useStyles();
  const [moviesList, setMoviesList] = useState({});

  useEffect(() => {
    if (Object.keys(moviesList).length !== 0) {
      return;
    }
    const fetchMovies = async () => {
      const list = await moviesAPI.getList(1);

      setMoviesList(list);
    };
    fetchMovies();
  }, [
    moviesList,
  ]);

  return (
    <Box>
      {console.log(moviesList)}
      <div className={classes.h1}>TEST APP</div>
    </Box>
  );
}
