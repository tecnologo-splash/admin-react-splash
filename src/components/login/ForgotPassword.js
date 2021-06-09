import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import Snackbar from '@material-ui/core/Snackbar';
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { StepComponent } from "./StepForgotPassword/Step";
import { sendRecoveryMail, changePassword } from "../../services/adminService"

export function ForgotPassword() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMail = () => {
    sendRecoveryMail(data.email)
    .then(
      response => {
        if(!response.error) {
          setErrorMessage(response.message)
          handleErrorOpen()
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          setErrorMessage(response.message)
          handleErrorOpen()
        }
      }
    );    
  }

  const changeNewPassword = () =>{
    changePassword(data.email, data.codigo, data.nuevaClave)
    .then(
      response => {
        if(!response.error) {
          setErrorMessage(response.message)
          handleErrorOpen()
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          console.log(response.message)
        } else {
          console.log(response.message)
          setErrorMessage(response.message)
          handleErrorOpen()
        }
      }
    );    
  }

  function getSteps() {
    return ["Ingresar email", "Código de verificación", "Nueva contraseña"];
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if( activeStep === 0){
      sendMail()
    }
    if( activeStep === 1){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if( activeStep === 2){
      changeNewPassword()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const [errorMessage, setErrorMessage ] = useState("");
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


  const [data, setData] = useState({email: "", codigo: "", nuevaClave:""});
    
  const onChangeData = (event) => {
    let name = event.target.name
    let value = event.target.value
    
    setData({...data, [name]: value})
  }


  return (
    <div>
      <Snackbar
        message={errorMessage}
        open={openError}
        onClose={() => handleErrorClose()}
        autoHideDuration={3000}
      />
      <Link component="button" variant="body2" onClick={handleClickOpen}>
        ¿Olvidaste tu contraseña?
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reestablecer Contraseña</DialogTitle>
        <DialogContent>


          <Stepper activeStep={activeStep} alternativeLabel >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className="d-flex justify-content-center align-items-center">
                  <CheckCircleOutlineIcon
                    style={{ fontSize: 40 }}
                    color="primary"
                  />
                  Proceso finalizado con éxito
                </Typography>
                <Button onClick={handleReset}>Reiniciar</Button>
              </div>
            ) : (
              <div>

                <StepComponent 
                  stepIndex={activeStep} 
                  onChangeData={onChangeData} 
                  data={data}
                />
                
                <div className="col-md-12 d-flex justify-content-center">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Atrás
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions className="pb-4 mr-4">
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
