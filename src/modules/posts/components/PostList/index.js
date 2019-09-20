import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { getPostList } from '../../actions';
import { getPosts, getIsAllPostsLoaded } from '../../selectors';

const PostList = ({ match }) => {
    const dispatch = useDispatch();
    
    const posts = useSelector(state => getPosts(state));
    const isAllPostsLoaded = useSelector(state => getIsAllPostsLoaded(state));

    useEffect(() => {
        if (!isAllPostsLoaded) dispatch(getPostList());
    }, [isAllPostsLoaded]);

    const displayPosts = () => {
        return (
            <List>
                {posts.map(({ id, title, userId }) => 
                    <ListItem alignItems='flex-start'>
                        <ListItemText primary = {title} 
                            secondary = {
                            <Typography variant = 'subtitle1'>
                                <Link to={`${match.url}/${id}`}>
                                    <Button color="primary" >
                                        Read more
                                    </Button>
                                </Link>
                                <Link to={`users/${userId}`}>
                                    <Button color="primary" >
                                        User info
                                    </Button>
                                </Link> 
                                
                            </Typography>
                        } />
                    </ListItem>
                )}
            </List>
        )
    }

    return (
        <Grid container spacing = {0}>
            <Grid item xs = {12}>
                <Typography variant = 'h5'>
                    Posts
                </Typography>
            </Grid>
            
            {isAllPostsLoaded ? 
                <Grid item xs = {12}>
                    {displayPosts()}
                </Grid>
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