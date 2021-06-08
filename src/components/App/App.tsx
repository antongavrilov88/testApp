import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Box>
      <div className={classes.h1}>TEST APP</div>
    </Box>
  );
}
