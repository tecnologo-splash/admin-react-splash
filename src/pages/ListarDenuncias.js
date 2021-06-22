import React from 'react';

import ListReports from "../components/administradores/List-Reports.component";
import AppBarSplash from "../components/shared/appbar.component";
import Container from '@material-ui/core/Container';


export default function ListarDenuncias() {
  return (
    <div>
      <AppBarSplash />
      <Container>
        <ListReports />
      </Container>
    </div>
  );
}