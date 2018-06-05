import {profile} from '../actions/profile'

const initialState ={
      nama:'null',
      NoTelp:'null',
      email:'null',
};

export default reducer=(state = initialState, action) => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, islogin:true };
        return state;
    }
  };