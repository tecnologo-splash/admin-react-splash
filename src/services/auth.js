import { BASE_URL } from '../config/settings'

export const login = (username, password) => {
    
    var credentials = { 
        "correo": username, 
        "clave": password 
    }

    var myInit = {
        'mode':'no-cors',
        'method': 'POST',
        'Content-Type': "application/json",
        'accept':'*/*',
        'body': credentials
    }
    
    fetch(BASE_URL + "users/auth", myInit)
    .then(data => console.log(data));
}