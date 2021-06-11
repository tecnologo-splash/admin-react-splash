import React, {useContext, useEffect} from 'react';

import AppBarSplash from "../components/shared/appbar.component";
import {Context as AdminContext} from "../contexts/AdminContext";
import Estadisticas from "../components/estadisticas/estadisticas";


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';



export default function Inicio() {

  const { state: {token, currentUser}, getInfo } = useContext(AdminContext);
  
  useEffect(()=>(
    getInfo()
  ),[token])

  return(
      <div>

          <AppBarSplash />
        
          <Estadisticas />


      </div>
  )
} 