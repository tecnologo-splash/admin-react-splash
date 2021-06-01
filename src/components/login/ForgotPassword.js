import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";

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

  function getSteps() {
    return ["Ingresar email", "Codigo de verificacion", "Nueva contraseña"];
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Link component="button" variant="body2" onClick={handleClickOpen}>
        ¿Olvidaste tu contraseña?
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reseteo de Contraseña</DialogTitle>
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
                  Proceso finalizado con exito
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                  <StepComponent stepIndex={activeStep} />
            
                <div className="col-md-12 d-flex justify-content-center">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Atras
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
