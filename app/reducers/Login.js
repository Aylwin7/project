import {ProsesLOGIN,Logout} from '../actions/Login'

const initialState ={
    nama:'',
    NoTelp:'',
    email:'',
    islogin:false
};

export default reducer=(state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, islogin:true };
        case 'LOGOUT':
        return { state:initialState };
        case 'FETCH':
        return { ...state, 
                  nama:action.nama,
                  NoTelp:action.NoTelp,
                  email:action.email };
      default:
        return state;
    }
  };