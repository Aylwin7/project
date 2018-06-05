import {Themes} from '../actions/Themes'
const initialState ={
  primaryColor: '#1919ff',
};

export default reducer=(state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_NAV_COLOR':
        return { ...state, 
          primaryColor: action.color  };
      default:
        return state;
    }
  };