import * as constants from '../../constants';

const initialState = {
    usersList: [],
    isError: false
};

const posts = (state = initialState, action) => {
    switch(action.type) { 
        case constants.SET_USER:
            return {
                ...state,
                usersList: [...state.usersList, action.user]
            }
        default: 
            return state;     
    } 
};
  
export default posts;