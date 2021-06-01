import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Box from  "@material-ui/core/Box";



export function StepComponent({stepIndex}) {
    switch (stepIndex) {
      case 0:
        return (
        
            <TextField
            fullWidth
            className="mb-4"
              variant="outlined"
              label="Email"
              color="primary"
              type="text"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
 

        );
      case 1:
        return (
          
          <TextField
          fullWidth
          className="mb-4"
            variant="outlined"
            label="Codigo de Verifiacion"
            color="primary"
            type="text"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
            }}
          />

        );
      case 2:
        return (
          <TextField
          fullWidth
          className="mb-4"
            variant="outlined"
            label="Nueva Contraseña"
            color="primary"
            type="text"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      default:
        return (
<>
<CheckCircleOutlineIcon style={{ fontSize: 40 }} />

</>
        );
    }
  }