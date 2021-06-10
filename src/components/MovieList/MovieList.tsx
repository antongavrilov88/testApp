/* eslint-disable guard-for-in */
/* eslint-disable import/no-cycle */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Typography, Link } from '@material-ui/core';

import { useAppProvider } from '../AppProvider/AppProvider';

const useStyles = makeStyles(
  {
    marked: {
      backgroundColor: 'grey',
    },
    clickable: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
);

export const MovieList = () => {
  const classes = useStyles();
  const {
    moviesList, setMoviesList, setMarkedMovies,
  } = useAppProvider();

  const [order, setOrder] = React.useState('ASC');

  const onRemoveMovie = (id: number) => {
    const updatedList = moviesList.filter((movie) => movie.id !== id);

    setMoviesList(updatedList);
  };

  const onToggleMarkMovie = (id: number) => {
    if (String(id) in localStorage) {
      localStorage.removeItem(String(id));
    } else {
      localStorage.setItem(`${id}`, 'marked');
    }
    const getMarkedMovies = () => {
      const initMarkedMoviesList: string[] = [];
      for (const key in localStorage) {
        initMarkedMoviesList.push(key);
      }
      return initMarkedMoviesList;
    };
    setMarkedMovies(getMarkedMovies());
  };

  const onSortList = () => {
    if (order === 'ASC') {
      const sortedMoviesList = moviesList.sort((a, b) => a.vote_average - b.vote_average);
      setMoviesList(sortedMoviesList);
      setOrder('DESC');
    } else {
      const sortedMoviesList = moviesList.sort((a, b) => b.vote_average - a.vote_average);
      setMoviesList(sortedMoviesList);
      setOrder('ASC');
    }
  };

  return (
    <Paper elevation={3} variant="outlined">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Poster</Typography>
              </TableCell>
              <TableCell align="center"><Typography variant="h6">Title</Typography></TableCell>
              <TableCell align="center">
                <Box display="inline-flex">
                  <Box>
                    <Typography variant="h6">
                      Rate
                    </Typography>
                  </Box>
                  <Box className={classes.clickable} onClick={() => onSortList()}>&uarr;&darr;</Box>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Year</Typography>
                {' '}

              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Tools</Typography>
                {' '}

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            moviesList.map((movie) => {
              const isMarked = String(movie.id) in localStorage;
              return (
                <TableRow key={movie.id} className={isMarked ? classes.marked : ''}>
                  <TableCell>
                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
                  </TableCell>
                  <TableCell align="center">
                    <Link href={`https://www.themoviedb.org/movie/${movie.id}`}>
                      <Typography variant="h6">
                        {movie.title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      {movie.vote_average}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {movie.release_date}
                  </TableCell>
                  <TableCell>
                    <Box className={classes.clickable} onClick={() => onRemoveMovie(movie.id)}>
                      &#10006;
                    </Box>
                    <Box className={classes.clickable} onClick={() => onToggleMarkMovie(movie.id)}>
                      {String(movie.id) in localStorage ? <>&#11088;</> : <>&#9734;</>}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
