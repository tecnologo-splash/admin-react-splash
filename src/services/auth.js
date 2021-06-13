export const isAuthenticated = () => {
    return localStorage.getItem("tokenSplash") !== null;
}

export const getToken = () => {
    return localStorage.getItem("tokenSplash");
}


export const checkSession = (response) => {
    if(response.status === 403){
        localStorage.removeItem("tokenSplash");
        window.location.reload();
    }
}