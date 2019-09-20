import { combineReducers } from 'redux';

import posts from './modules/posts/reducer';
//import game from './modules/gameBoard/reducer';

const rootReducer = combineReducers({
    posts
});

export default rootReducer;