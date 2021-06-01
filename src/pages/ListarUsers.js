import React from 'react';

import ListUsers from "../components/List-Users.component";
import AppBarSplash from "../components/shared/appbar.component";



export default function ListarUsers() {
  return (
    <div>
      <AppBarSplash />
      <ListUsers />
    </div>
  );
}