import {CHANGESTATUS} from '../actions/contohRedux'

const initialState ={
    status:'OFF',
    tempstatus:"ON",    
    backColor :'#4F6D7A',
    backColortemp :'#008080',
};

export default reducer=(state = initialState, action) => {
    switch (action.type) {
      case CHANGESTATUS:
        return {...state, 
            status:state.tempstatus,
            tempstatus:state.status,
            backColor:state.backColortemp,
            backColortemp:state.backColor,            
       };
      default:
        return state;
    }
  };