/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Typography from '@material-ui/core/Typography';


import { withStyles } from "@material-ui/core/styles";

import { useEffect } from "react";
import { isAuthenticated } from "../services/auth";
import { useHistory } from "react-router";
import { LoginForm } from '../components/login/LoginForm';

export default function Login() {

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


  //Estado Local

  const history = useHistory();



  useEffect(()=>{
    if (isAuthenticated())
      history.push("/inicio")
  })

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
            Una red social para disfrutar plenamente divirtiendote con tus amigos<br/> y los nuevos por conocer.
          </WhiteTextTypography>
        </div>

        {/*Derecha*/}
        <LoginForm />
        
      </div>
    </>
  );
}
