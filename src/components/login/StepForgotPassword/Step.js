import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Box from  "@material-ui/core/Box";
import React, {useState} from 'react';


export function StepComponent({stepIndex,onChangeData,data}) {

    const [ showPass, setShowPass ] = useState(false);
    const showPassword = () => {
      setShowPass(!showPass)
    }

    switch (stepIndex) {
      case 0:
        return (
        
            <TextField
              fullWidth
              onChange={onChangeData}
              value={data.email}
              name="email"
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
            onChange={onChangeData}
            value={data.codigo}
            name="codigo"
            className="mb-4"
            variant="outlined"
            label="Codigo de Verificación"
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
            onChange={onChangeData}
            value={data.nuevaClave}
            name="nuevaClave"
            className="mb-4"
            variant="outlined"
            label="Nueva Contraseña"
            color="primary"
            type={showPass ? "text" : "password"}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={showPassword} style={{cursor:"pointer"}}>
                  <VisibilityIcon />
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