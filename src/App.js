import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import AppRoute from "./components/router/AppRoute";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Administradores from "./pages/Administradores";
import ListarUsers from "./pages/ListarUsers";

import {Provider as AdminProvider} from './contexts/AdminContext';
import {Provider as UsuarioProvider} from './contexts/UsuarioContext';

function App() {
  return (
    <AdminProvider>
      <Suspense fallback="Cargando...">
        <Router>

          <Switch>

            <Route exact path={"/login"} component={Login} isPrivate={false}/>
            <AppRoute path={"/inicio"} component={Inicio} isPrivate={true} />
            <AppRoute path={"/administradores"} component={Administradores} isPrivate={true} />
            
            <Redirect to="/inicio" />
            <UsuarioProvider>
              <AppRoute path={"/usuarios"} component={ListarUsers} isPrivate={true} />
            </UsuarioProvider>
    
          </Switch>
        </Router>
      </Suspense>
    </AdminProvider>

  );
}

export default App;
