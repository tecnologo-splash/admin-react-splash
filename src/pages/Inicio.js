import React, {useContext, useEffect} from 'react';
import AppBarSplash from "../components/shared/appbar.component";
import {Context as AdminContext} from "../contexts/AdminContext";



export default function Inicio() {

const { state: {token, currentUser}, getInfo } = useContext(AdminContext);
  
  useEffect(()=>(
    getInfo()
  ),[token])

  return(
      <div>

          <AppBarSplash />
        
          <span>Inicio</span>
          <span>{ currentUser ? currentUser.nombre : null }</span>
      </div>
  )
} 