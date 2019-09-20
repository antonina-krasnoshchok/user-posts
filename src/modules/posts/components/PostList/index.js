import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';



import { getPostList } from '../../actions';
import { getPosts, getIsAllPostsLoaded } from '../../selectors';

const PostList = ({ match }) => {
    const dispatch = useDispatch();
    
    const posts = useSelector(state => getPosts(state));
    const isAllPostsLoaded = useSelector(state => getIsAllPostsLoaded(state));

    useEffect(() => {
        if (!isAllPostsLoaded) dispatch(getPostList());
    }, [isAllPostsLoaded]);

    return (
        <Grid container spacing = {0}>
            <Grid item xs = {12}>
                <Typography variant = 'h5'>
                    Posts
                </Typography>
            </Grid>
            
            {isAllPostsLoaded ? 
                 posts.map(({ id, title, userId }) => {
                    return (
                        <Grid item xs = {12} key = {id}>
                            <Typography variant = 'subtitle1'>
                                <Link to={`${match.url}/${id}`}>
                                    {title}
                                </Link> 
                                (View user info)
                            </Typography>
                        </Grid>
                        )
                    }
                )
                :
                <Grid item xs = {12}>
                    <Typography variant = 'subtitle1'>
                        <CircularProgress />
                    </Typography>
                </Grid>    
            }
           
        </Grid>
    ) 
}

export default PostList;