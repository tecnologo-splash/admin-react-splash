import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import AppRoute from "./components/router/AppRoute";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";


function App() {
  return (
    <Suspense fallback="Cargando...">
      <Router>
        
        <Switch>

          <Route exact path={"/login"} component={Login} isPrivate={false}/>
          <AppRoute path={"/inicio"} component={Inicio} isPrivate={true} />
          <Redirect to="/inicio" />
      
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
