import * as constants  from '../../constants';
import axios from 'axios';

export const getUser = (userId) => {
  return (dispatch) => {
    const url =  `${constants.BASE_URL}/users/${userId}`;
    
    return axios.get(url)
      .then(({data}) => {
        dispatch(setUser(data));
      })
      .catch(() => {
        dispatch(setError());
      });         
  };
};

export const setUser = (user) => {
    return {
        type: constants.SET_USER,
        user
    };
}

export const setError = () => {
    return {
        type: constants.SET_ERROR
    };
}