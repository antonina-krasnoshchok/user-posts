import { combineReducers } from 'redux';

import posts from './modules/posts/reducer';
import users from './modules/users/reducer';

const rootReducer = combineReducers({
    posts,
    users
});

export default rootReducer;