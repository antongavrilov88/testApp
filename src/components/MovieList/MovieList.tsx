import * as React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Image from 'material-ui-image';

export const MovieList = (props: { movies: any; }) => {
  const { movies } = props;

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 100 },
  //   { field: 'image', headerName: 'Image', width: 200 },
  //   { field: 'title', headerName: 'Title', width: 500 },
  //   { field: 'currentRate', headerName: 'Rate', width: 130 },
  //   { field: 'year', headerName: 'Year', width: 100 },
  // ];

  // const rows = movies.map((movie: {
  //   id: any,
  //   poster_path: any;
  //   title: any;
  //   popularity: any;
  //   released_date: any;
  // }) => ({
  //   id: movie.id,
  //   image: movie.poster_path,
  //   title: movie.title,
  //   currentRate: movie.popularity,
  //   year: movie.released_date,
  // }));

  return (
    <TableContainer component={Paper}>
      {console.log(movies)}
      {/* <DataGrid rows={rows} columns={columns} pageSize={20} /> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  {movie.id}
                </TableCell>
                <TableCell>
                  <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
                </TableCell>
                <TableCell>
                  {movie.title}
                </TableCell>
                <TableCell>
                  {movie.popularity}
                </TableCell>
                <TableCell>
                  {movie.released_date}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  // </div>
  );
};
