import * as constants from '../../constants';

const initialState = {
    postList: [],
    isError: false,
    isAllPostsLoaded: false
};

const posts = (state = initialState, action) => {
    switch(action.type) { 
        case constants.SET_POSTS:
            let postList = [];
            if (state.postList.length > 0) {
                const newPosts = action.posts.filter (item => 
                    (state.postList.filter(post => post.id === item.id)).length === 0);
                postList = [state.postList[0], ...newPosts];
            } else {
                postList = action.posts;
            }
            return {
                ...state,
                postList,
                isAllPostsLoaded: action.isAllPostsLoaded
            }  
        case constants.SET_ERROR:
            return {
                ...state,
                isError: true
            }
        case constants.SET_POST_COMMENTS:
            const posts = state.postList.map(item => {
                if (item.id === action.postId) {
                    return {...item, comments: action.comments}
                } else {
                    return item;
                } 
            })
            return {
                ...state,
                postList: posts
            }
        default: 
            return state;     
    } 
};
  
export default posts;