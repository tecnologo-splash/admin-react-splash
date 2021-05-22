import crearContext from "./crearContext";
import {BASE_URL} from "../config/settings";

/* Inicio Reducer */
const InicioSesionReducer = (state,action) => {
    switch(action.type){
        case 'inicioSesion':
            return {...state, token: action.payload, error: ''};
        case 'onError':
            return {...state, error: action.payload.error}
        default:
            return state;
    }
}
/* Fin Reducer */

/* Inicio Actions */

const inicioSesion = (dispatch) => ({usuario, password}) =>{

    try {
        
        var credentials = { 
            correo: usuario, 
            clave: password 
        }

        var myInit = {
            'method': 'POST',
            'headers': {'Content-Type': "application/json"},
            'body': JSON.stringify(credentials)
        }

        fetch(BASE_URL + "users/auth", myInit)
        .then(response => response.json())
        .then(data => {
                localStorage.setItem('tokenSplash',  data.token);
                dispatch({ type: 'inicioSesion', payload: data.token })
        });

    } catch (e) {
        dispatch({type: 'onError', payload: {error: e}});
    }
    
}

/*
export const getToken = () => {
    return localStorage.getItem('tokenSplash');
}
*/

/* Fin Actions */





export const {Context, Provider} = crearContext(
    InicioSesionReducer,
    { inicioSesion },
    { error:'', token:''}
);



