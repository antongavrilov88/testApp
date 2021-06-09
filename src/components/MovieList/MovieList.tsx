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
import { useAppProvider } from '../AppProvider/AppProvider';

const useStyles = makeStyles(
  {
    marked: {
      backgroundColor: 'grey',
    },
  },
);

export const MovieList = () => {
  const classes = useStyles();
  const {
    moviesList, setMoviesList, setMarkedMovies,
  } = useAppProvider();

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
      // eslint-disable-next-line guard-for-in
      for (const key in localStorage) {
        initMarkedMoviesList.push(key);
      }
      return initMarkedMoviesList;
    };
    setMarkedMovies(getMarkedMovies());
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Tools</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            moviesList.map((movie) => {
              const isMarked = String(movie.id) in localStorage;
              // eslint-disable-next-line react/jsx-tag-spacing
              return (
                <TableRow key={movie.id} className={isMarked ? classes.marked : ''}>
                  <TableCell>
                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
                  </TableCell>
                  <TableCell align="center">
                    <a href={`https://www.themoviedb.org/movie/${movie.id}`}>{movie.title}</a>
                  </TableCell>
                  <TableCell>
                    {movie.vote_average}
                  </TableCell>
                  <TableCell>
                    {movie.release_date}
                  </TableCell>
                  <TableCell>
                    <Box onClick={() => onRemoveMovie(movie.id)}>
                      &#10006;
                    </Box>
                    <Box onClick={() => onToggleMarkMovie(movie.id)}>
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
  );
};
