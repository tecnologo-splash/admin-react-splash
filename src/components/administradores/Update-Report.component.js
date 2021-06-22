import React, { useContext } from "react";

import IconButton from '@material-ui/core/IconButton';
import {Context as DenunciaContext } from "../../contexts/DenunciaContext";

import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export function UpdateReport(props) {
   
  const { updateReview } = useContext(DenunciaContext);

  const handleReview = () => {
    updateReview(props.id, true)
  }

  const handleUnReview = () => {
    updateReview(props.id, false);
  }

 
  return (
    <div>{( props.revisada ? 
      <Tooltip title="Marcar como no revisada">
        <IconButton aria-label="Marcar como no revisada" onClick={handleUnReview}>
          <VisibilityOffIcon />
        </IconButton>
      </Tooltip>
      :
      <Tooltip title="Marcar como revisada">
        <IconButton aria-label="Marcar como revisada" onClick={handleReview}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    )}
      
    </div>
  );
}
