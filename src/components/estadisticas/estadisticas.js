import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grafica from './grafica';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    
  },
  graficas: {
      width: '100%',
      padding: '5%',
      paddingTop: '1%'
  }
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        
      </AppBar>
      <div className={classes.graficas}>

          <Grid container spacing={3} padding={3}>

            <Grid item xs={6}>
              <Grafica estadistica={{componente:"Genero",text:"Usuarios por género"}}/>
            </Grid>
            <Grid item xs={6}>
              <Grafica estadistica={{componente:"Publicacion",text:"Publicaciones por tipo"}}/>
            </Grid>
            <Grid item xs={6}>
              <Grafica estadistica={{componente:"Mes",text:"Usuarios registrados por mes"}}/>
            </Grid>
            <Grid item xs={6}>
              <Grafica estadistica={{componente:"Anio",text:"Usuarios registrados por año"}}/>
            </Grid>
          </Grid>

      </div>
    </div>
  );
}