import { BASE_URL } from '../config/settings';
import {Redirect} from 'react-router-dom';

export const login = (username, password) => {
    
    var credentials = { 
        "correo": username, 
        "clave": password 
    }

    var myInit = {
        //'mode':'no-cors',
        'method': 'POST',
        headers: {'Content-Type': "application/json"},
        //'accept':'*/*',
        'body': JSON.stringify(credentials)
    }
    
    return fetch(BASE_URL + "users/auth", myInit)
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("tokenSplash",data.token);
        }

        return data.token;
    });
}

export const logout = () => {
    localStorage.removeItem("tokenSplash");
    window.location.reload();
}


export const isAuthenticated = () => {
    return localStorage.getItem("tokenSplash") !== null;
}
