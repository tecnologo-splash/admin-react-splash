export const isAuthenticated = () => {
    return localStorage.getItem("tokenSplash") !== null;
}

export const getToken = () => {
    return localStorage.getItem("tokenSplash");
}
