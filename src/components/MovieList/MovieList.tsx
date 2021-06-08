import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export const MovieList = (props: { movies: any; }) => {
  const { movies } = props;

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'image', headerName: 'Image', width: 200 },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'currentRate', headerName: 'Rate', width: 130 },
    { field: 'year', headerName: 'Year', width: 100 },
  ];

  const rows = movies.map((movie: {
    id: any,
    poster_path: any;
    title: any;
    popularity: any;
    released_date: any;
  }) => ({
    id: movie.id,
    image: movie.poster_path,
    title: movie.title,
    currentRate: movie.popularity,
    year: movie.released_date,
  }));

  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} />
    </div>
  );
};
