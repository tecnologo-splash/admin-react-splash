import React from 'react';

import ListUsers from "../components/usuarios/List-Users.component";
import AppBarSplash from "../components/shared/appbar.component";
import Container from '@material-ui/core/Container';


export default function ListarUsers() {
  return (
    <div>
      <AppBarSplash />
      <Container>
        <ListUsers />
      </Container>
    </div>
  );
}