import React from 'react';
import AppBarSplash from "../components/shared/appbar.component";
import ListAdmin from "../components/administradores/List-Admin.component";
import {NewAdmin} from "../components/administradores/New-Admin.component";

import Container from '@material-ui/core/Container';


export default function Administradores() {
  
  return(
      <div>
        
        <AppBarSplash />

        <Container>

          <NewAdmin />
          
          <ListAdmin />

        </Container>
      </div>
  )
} 






