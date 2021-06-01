import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from '@material-ui/core/Link';

import Grid from "@material-ui/core/Grid";

import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/core/styles';
import {Context as AdminContext} from "../../contexts/AdminContext";

import { addAdminUser } from '../../services/adminService';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    divButtons: {
      textAlign: "right"
    }
  }));

export function NewAdmin() {
  const { getAdminUsers } = useContext(AdminContext)
  
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [datosUsuario,setDatosUsuario]=useState({
    nombre:"",
    apellido:"",
    usuario:"",
    clave:"",
    correo:"",
    confirmar:"",
  });
  
  const [errores,setErrores] = useState({
    usuario:  {error: false, mensaje: ''},
    nombre:   {error: false, mensaje: ''},
    apellido: {error: false, mensaje: ''},
    correo:   {error: false, mensaje: ''},
    clave:    {error: false, mensaje: ''},    
  })

  const { state } = useContext(AdminContext);

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSubmit = () => {
    
    var erroresLocal = {
      usuario:  {error: false, mensaje: ''},
      nombre:   {error: false, mensaje: ''},
      apellido: {error: false, mensaje: ''},
      correo:   {error: false, mensaje: ''},
      clave:    {error: false, mensaje: ''},    
    }

    var error = false
    
    if(datosUsuario.nombre === ""){
      error = true;
      erroresLocal.nombre = {error: true, mensaje:'Campo requerido'}
    }
    
    if(datosUsuario.apellido === ""){
      error = true;
      erroresLocal.apellido = {error: true, mensaje:'Campo requerido'}
    }
    
    if(datosUsuario.usuario === ""){
      error = true;
      erroresLocal.usuario = {error: true, mensaje:'Campo requerido'}
    }
    if(datosUsuario.clave === ""){
      error = true;
      erroresLocal.clave = {error: true, mensaje:'Campo requerido'}
    }
    
    if(!emailRegex.test(datosUsuario.correo)){
      error = true;
      erroresLocal.correo = {error: true, mensaje:'Correo Inválido'}
    }
    
    if(datosUsuario.clave !== datosUsuario.confirmar){
      error = true
      erroresLocal.clave = {error: true, mensaje:'Claves no coinciden'}
    }
    setErrores(erroresLocal)

    console.log(error)
    if (!error){
      addAdminUser(datosUsuario).then(
        response => {
          if(!response.error) {
            getAdminUsers(0,10)
            handleClose()
          } else {
            setErrorMessage(response.message)
            handleErrorOpen()
          }
        }
      );    
    }
  }

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setDatosUsuario({
      ...datosUsuario,
      [name]: value
    })
    setErrores({
      ...errores,
      [name]: {error: false, mensaje: ''}
    })
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDatosUsuario({
      nombre:"",
      apellido:"",
      usuario:"",
      clave:"",
      correo:"",
      confirmar:"",
    })
    setOpen(false);
  };
  
  const [openError, setOpenError] = React.useState(false);
    
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleErrorOpen = () => {
    setOpenError(true);
  };


  return (
    <div>
      <div className={classes.divButtons}>
        <Button
            className="mt-2"
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            Nuevo
        </Button>
      </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
              Nuevo Administrador
            </DialogTitle>
            
            <DialogContent>

            <Snackbar
              message={errorMessage}
              open={openError}
              onClose={() => handleErrorClose()}
              autoHideDuration={3000}
            />

              <Grid container spacing={2}  >
                <CampoTexto 
                    onChangeInput={onChangeInput}
                    helperText={errores.nombre.mensaje} 
                    error={errores.nombre.error}  
                    name="nombre"
                    Label="Nombre" 
                    Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={errores.apellido.mensaje} 
                  error={errores.apellido.error}  
                  name="apellido" 
                  Label="Apellido" 
                  Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput}
                  helperText={errores.usuario.mensaje} 
                  error={errores.usuario.error}  
                  name="usuario" 
                  Label="Usuario" 
                  Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={errores.correo.mensaje} 
                  error={errores.correo.error} 
                  name="correo" 
                  Label="Email" 
                  Icon={<EmailIcon />} 
                  Type="email"
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={errores.clave.mensaje} 
                  error={errores.clave.error} 
                  name="clave" 
                  Label="Contraseña" 
                  Icon={<VpnKeyIcon />} 
                  Type="password"
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={"Claves no coinciden"} 
                  error={datosUsuario.clave !== datosUsuario.confirmar} 
                  name="confirmar" 
                  Label="Confirmar contraseña" 
                  Icon={<VpnKeyIcon />} 
                  Type="password"
                />
    
                <Grid item xs={12}> 
                    <Typography variant="caption">
                        * Campos obligatirios
                    </Typography>
                </Grid>

                <Grid item xs={12}> 
                    <Typography variant="caption" display="block" gutterBottom>
                        Al hacer clic en Registrarte,
                        <Link href="#">
                            {'   aceptas las Condiciones, la Política de datos '}
                        </Link>
                        del servicio en cuestion
                    </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="pb-4 mr-4">
                <Button onClick={handleClose} color="primary">
                    Calcelar
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
export function CampoTexto({Label,Icon,Type="text",onChangeInput,name,error,helperText,value}){

  return (
    <Grid item xs={6} className="mt-3">
    <TextField
    fullWidth
      value = {value}
      error = {error}
      helperText={error ? helperText : ""}
      name={name}
      variant="outlined"
      label={Label}
      onChange={onChangeInput}
      color="primary"
      type={Type}
      required
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" >
            {Icon}
          </InputAdornment>
        ),
      }}
    />
  </Grid>
  )

}
