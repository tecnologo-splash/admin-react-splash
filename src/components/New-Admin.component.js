import React, { useState, useContext } from "react";
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

import { makeStyles } from '@material-ui/core/styles';
import {Context as AdminContext} from "../contexts/AdminContext";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export function NewAdmin() {
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [submit, setSubmit] = useState(false);
  
  const [datosUsuario,setDatosUsuario]=useState({
    nombre:null,
    apellido:null,
    usuario:null,
    clave:null,
    correo:null,
    confirmar:null,
  });
  
  const { addAdminUser } = useContext(AdminContext);

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSubmit = () => {
    var error = false
    
    error = datosUsuario.password !== datosUsuario.clave;
    error = !emailRegex.test(datosUsuario.correo)
    
    if (!error){
      addAdminUser(datosUsuario);
      handleClose()
    } else {
      setSubmit(true);
    }
    
  }

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setDatosUsuario({
      ...datosUsuario,
      [name]: value
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>

        <Button
            className="mt-2"
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            Nuevo Administrador
        </Button>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
              Nuevo Administrador
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={2}  >
                <CampoTexto 
                    name="nombre"
                    Label="Nombre" 
                    Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  name="apellido" 
                  Label="Apellido" 
                  Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  name="usuario" 
                  Label="Usuario" 
                  Icon={<AccountCircle />}
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={"Formato de correo inválido"} 
                  error={submit && !emailRegex.test(datosUsuario.correo)} 
                  name="correo" 
                  Label="Email" 
                  Icon={<EmailIcon />} 
                  Type="email"
                />
                <CampoTexto 
                  onChangeInput={onChangeInput} 
                  helperText={"Claves no coinciden"} 
                  error={datosUsuario.clave !== datosUsuario.confirmar} 
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
                        * Campos obligatorios
                    </Typography>
                </Grid>

                <Grid item xs={12}> 
                    <Typography variant="caption" display="block" gutterBottom>
                        Al hacer clic en Registrarte,
                        <Link href="#">
                            {' aceptas las Condiciones y la Política de datos '}
                        </Link>
                        del servicio en cuestión
                    </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="pb-4 mr-4">
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
export function CampoTexto({Label,Icon,Type="text",onChangeInput,name,error,helperText}){

  return (
    <Grid item xs={6} className="mt-3">
    <TextField
    fullWidth
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
