import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { ForgotPassword } from './ForgotPassword';
import {Context as AdminContext} from "../../contexts/AdminContext";
import { useState, useContext, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../services/auth";

export function LoginForm() {

    const loginFormStyles = css`
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
        background-color: #ecf0f1;
        padding: 25px;
    `;

    const inputStyles = css`
        background-color: white;
    `;
  
    const mensajeError=css`
        color:#F44336;
    `;

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {state:{ token }, login } = useContext(AdminContext);
  
    const [errores,setErrores] = useState({
        usuario:  {error: false, mensaje: ''},
        clave:    {error: false, mensaje: ''},    
      })

    const functionLogin = () => {
        var erroresLocal = {
            usuario:  {error: false, mensaje: ''},
            clave:    {error: false, mensaje: ''},    
        }
        var errorLocal = false
    
        if(username === ""){
        errorLocal = true;
        erroresLocal.usuario = {error: true, mensaje:'Campo requerido'}
        }
        
        if(password === ""){
        errorLocal = true;
        erroresLocal.clave = {error: true, mensaje:'Campo requerido'}
        }

        setErrores(erroresLocal)
        
        if (!errorLocal){
            login(username, password).then(
                response => {
                    if(response.error) {
                        setErrorMessage(response.message)
                        setError(true)
                    }
                }
            );
        }    
    }
  
    const onChangeUsername = (event) => {
      setUsername(event.target.value)    
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value)
    };

    useEffect(()=>{
    if (isAuthenticated())
        history.push("/inicio")
    })

    return(
        <div className="col-sm-4 col-md-3 offset-md-1">

          <div css={loginFormStyles} className="rounded">
            <Typography variant="h4" gutterBottom>
              <center>Inicio de Sesión</center>
            </Typography>
            <div className="mb-3">
              <TextField fullWidth
                error = {errores.usuario.error}
                helperText = {errores.usuario.mensaje}
                name = "usuario" 
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
                error = {errores.clave.error}
                helperText = {errores.clave.mensaje}
                name = "clave" 
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
              {
                error && 
                <div className="col-md-12" css={mensajeError}><center><b>{errorMessage}</b></center></div>
              } 
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
    )

}