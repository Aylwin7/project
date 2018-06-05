// export const CHECK_LOGIN='CHECK_LOGIN';
export const LOGIN='LOGIN'
export const LOGOUT='LOGOUT'
export const FETCH='FETCH'
export const ProsesLOGIN=()=>({
    type:LOGIN,
});
export const Logout=()=>({
    type:LOGOUT,
});
export const Fetch=(nama,NoTelp,email)=>({
    type:FETCH,
    nama,NoTelp,email
});
