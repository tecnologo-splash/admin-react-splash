/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { ForgotPassword } from '../components/login/ForgotPassword';
import { withStyles } from "@material-ui/core/styles";
import { login } from "../services/auth";

import React, { useState } from "react";

export function Login() {
  const loginFormStyles = css`
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #ecf0f1;
    padding: 25px;
  `;

  const inputStyles = css`
    background-color: white;
  `;
  const bodyStyles = css`
  background: url(${process.env.PUBLIC_URL + '/recursos/splashbg.svg'}) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  `;

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);



  const [username, setUsername] = useState("hola");
  const [password, setPassword] = useState("chau");

  const functionLogin = () => {
    login(username, password);
  }

  const onChangeUsername = (event) => {
    setUsername(event.target.value)    
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }


  return (
    <>

      <div className="col-md-12 row  align-items-center justify-content-center vh-100 " css={bodyStyles}>
        
        {/*Izquierda*/}
        <div className="col-md-6">
          <img
            src={process.env.PUBLIC_URL + '/recursos/svg/splashbg.svg'}
            className="w-50"
            alt=""
          />
          <img
            src={process.env.PUBLIC_URL + '/recursos/svg/logo_dark.svg'}
            className="w-50"
            alt=""
          />
          <WhiteTextTypography variant="h6" gutterBottom color="secondary">

            Bienvenido a la Administración de Splash
          </WhiteTextTypography>
          <WhiteTextTypography variant="body1" gutterBottom color="secondary">
            Una red social para disfrutar plenamente diviritiendote con tus amigos y  los nuevos por conocer.
          </WhiteTextTypography>
        </div>

        {/*Derecha*/}

        <div className="col-sm-4 col-md-3 offset-md-1">

          <div css={loginFormStyles} className="rounded">
            <Typography variant="h4" gutterBottom>
              <center>Inicio de Sesión</center>
            </Typography>
            <div className="mb-3">
              <TextField fullWidth
                className="mt-4"
                label="Usuario"
                autoFocus={true}
                variant="outlined"
                onChange={onChangeUsername}
                required
                css={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mb-3">
              <TextField fullWidth
                className="mt-4"
                variant="outlined"
                css={inputStyles}
                label="Contraseña"
                color="primary"
                type="password"
                onChange={onChangePassword}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
              />

              </div>
                <Button variant="contained" color="primary" fullWidth className="mt-2" size="large" onClick={functionLogin}>
                  Iniciar Sesión
                </Button>{" "}

                <div className="text-center pt-2 pb-3">

                  <ForgotPassword />
                  
                  <hr />
            </div>
            
            <div className="text-center">

              <Typography variant="caption">
                * Campos obligatorios
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
