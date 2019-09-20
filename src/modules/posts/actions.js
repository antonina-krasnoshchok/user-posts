import * as constants  from '../../constants';
import axios from 'axios';

export const getPostList = () => {
  return (dispatch) => {
    const url =  `${constants.BASE_URL}/posts`;
    
    return axios.get(url)
      .then(({data}) => {
        const posts = data.map(({ id, userId, title, body }) => {
            return {
                id,
                userId,
                title,
                body
            }
        }); 
        dispatch(setPostList(posts, true));
      })
      .catch(() => {
        dispatch(setError());
      });         
  };
};

export const getPost = (id) => {
    return (dispatch) => {
        const url =  `${constants.BASE_URL}/posts/${id}`;
        
        return axios.get(url)
        .then(({data}) => {
            dispatch(setPostList([data], false));
            dispatch(getPostComments(id));   
        })
        .catch(() => {
            dispatch(setError());
        });        
    };
};

export const getPostComments = (postId) => {
    return (dispatch) => {
      const url =  `${constants.BASE_URL}/posts/${postId}/comments?postId=${postId}`;
      
      return axios.get(url)
        .then(({data}) => {
          const comments = data.map(({ id, name, email, body }) => {
              return {
                  id,
                  name,
                  email,
                  body
              }
          }); 
          dispatch(setPostComments(postId, comments));
        })
        .catch(() => {
          dispatch(setError());
        });         
    };
  };

export const setPostList = (posts, isAllPostsLoaded) => {
    return {
        type: constants.SET_POSTS,
        posts,
        isAllPostsLoaded
    };
}

export const setPostComments = (postId, comments) => {
    return {
        type: constants.SET_POST_COMMENTS,
        comments,
        postId
    };
}

export const setError = () => {
    return {
        type: constants.SET_ERROR
    };
}


