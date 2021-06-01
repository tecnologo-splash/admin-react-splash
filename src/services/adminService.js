import { BASE_URL } from "../config/settings";
import { getToken } from "./auth";

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
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}

export const lockingUser = async (userId, bloqueado) => {
    
    var newState = { 
        "bloqueado" : bloqueado
    }

    var myInit = {
        'method': 'PUT',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken(),
        },
        body: JSON.stringify(newState)
    }
    
    return await fetch(BASE_URL + "users/" + userId, myInit)
    .then(async (response) => {
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}