import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import AppRoute from "./components/router/AppRoute";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Administradores from "./pages/Administradores";
import ListarUsers from "./pages/ListarUsers";
import ListarDenuncias from "./pages/ListarDenuncias";

import {Provider as AdminProvider} from './contexts/AdminContext';
import {Provider as UsuarioProvider} from './contexts/UsuarioContext';
import {Provider as DenunciaProvider} from './contexts/DenunciaContext';

function App() {
  return (
    <AdminProvider>
      <Suspense fallback="Cargando...">
        <Router>

          <Switch>

            <Route exact path={"/"} component={Login} isPrivate={false}/>
            <AppRoute path={"/inicio"} component={Inicio} isPrivate={true} />
            <AppRoute path={"/administradores"} component={Administradores} isPrivate={true} />
            
            <UsuarioProvider>
              <DenunciaProvider>
              <AppRoute path={"/usuarios"} component={ListarUsers} isPrivate={true} />
                <AppRoute path={"/denuncias"} component={ListarDenuncias} isPrivate={true} />
              </DenunciaProvider>
            </UsuarioProvider>
            
            
            <Redirect to="/inicio" />
    
          </Switch>
        </Router>
      </Suspense>
    </AdminProvider>

  );
}

export default App;
