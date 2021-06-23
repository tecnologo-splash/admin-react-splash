import React, {useContext, useEffect} from 'react';

import AppBarSplash from "../components/shared/appbar.component";
import {Context as AdminContext} from "../contexts/AdminContext";
import Estadisticas from "../components/estadisticas/estadisticas";


export default function Inicio() {

  const { state: {token}, getInfo } = useContext(AdminContext);
  
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