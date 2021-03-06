import { BASE_URL } from "../config/settings";
import { getToken, checkSession } from "./auth";

export const addAdminUser = async (usuario) => {
    
    var newUser = { 
        "correo": usuario.correo, 
        "clave": usuario.clave,
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "usuario": usuario.usuario
    }
    
    var myInit = {
        'method': 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken(),
        },
        'body': JSON.stringify(newUser)
    }
    
    return await fetch(BASE_URL + "users/admin/sign-up", myInit)
    .then(async (response) => {
        checkSession(response)
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}


export const delAdminUser = async (userId) => {
    
    var myInit = {
        'method': 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken(),
        },
    }
    
    return await fetch(BASE_URL + "users/admin/" + userId, myInit)
    .then(async (response) => {
        checkSession(response)
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}

export const sendRecoveryMail = async (correo) => {
    
    var credentials = { 
        "correo": correo,
    }

    var myInit = {
        'method': 'POST',
        headers: {'Content-Type': "application/json"},
        'body': JSON.stringify(credentials)
    }
    
    return await fetch(BASE_URL + "users/recovery-password", myInit)
    .then( async response => {
        checkSession(response)
        if (response.ok) {
            let data = await response.json()
            return {error: false, message: data.message}
        } else {
            let json = await response.json();
            return  {error: true, message: json.message}
        }

    });
}

export const changePassword = async (correo,codigo,clave) => {
    
    var credentials = { 
        "correo": correo,
        "codigo": codigo,
        "clave": clave,
    }

    var myInit = {
        'method': 'POST',
        headers: {'Content-Type': "application/json"},
        'body': JSON.stringify(credentials)
    }
    
    return await fetch(BASE_URL + "users/recovery-password", myInit)
    .then( async response => {
        checkSession(response)
        if (response.ok) {
            let data = await response.json()
            return {error: false, message: data.message}
        } else {
            let json = await response.json();
            return  {error: true, message: json.message}
        }

    });
}

export const getEstadisticas = async (path) => {
    
    var myInit = {
        'method': 'GET',
        headers: {'Content-Type': "application/json",
                  'Authorization': "Bearer " + getToken()
        },
    }
    
    return await fetch(BASE_URL + `estadisticas/${path}`, myInit)
    .then( async response => {
        checkSession(response)
        if (response.ok) {
            return await response.json()
            
        } else {
            let json = await response.json();
            return  {error: true, message: json.message}
        }

    });
}