import React from 'react';
import AppBarSplash from "../components/shared/appbar.component";
import ListAdmin from "../components/List-Admin.component";
import {NewAdmin} from "../components/New-Admin.component";

export default function Administradores() {
  
  return(
      <div>

          <AppBarSplash />
        
          <span>Administradores</span>
          <NewAdmin />
          <ListAdmin />
          
      </div>
  )
} 






