import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import { getPost, getPostComments } from '../../actions';
import { getPosts, getError } from '../../selectors';

const Post = ({ match }) => {
    const dispatch = useDispatch();

    const posts = useSelector(state => getPosts(state));
    const isError = useSelector(state => getError(state));

    const postId = +match.params.id;
    const post = posts.find(({ id }) => id === postId);

    useEffect(() => {
        if (!post && !isError) {
            dispatch(getPost(postId));
        } else if (post && !post.comments) {
            dispatch(getPostComments(postId));
        }
    }, [postId]);

    return (
        <Grid container spacing = {0}>
            {
                ( isError ) ? 
                    <Grid item xs = {12}>
                        <Typography variant = 'h5' color = 'secondary'>
                            Can't load post
                        </Typography>
                    </Grid>
                : 
                    (!post) ? 
                        <Typography variant = 'subtitle1'>
                            <CircularProgress />
                        </Typography>
                    :
                        <Fragment>
                            <Grid item xs = {12}>
                                <Typography variant = 'h6' color = 'primary'>
                                {post.title}
                                </Typography>
                            </Grid>
                            <Grid item xs = {12}>
                                <Typography variant = 'body2'>
                                {post.body}
                                </Typography>
                            </Grid>
                            <Grid item xs = {12}>
                                <List>
                                    <ListItem alignItems='flex-start'>
                                        <ListItemText primary = 'Comments:' />
                                    </ListItem>
                                    { post.comments && post.comments.map(({ id, name: userName, email, body }) => 
                                        <Fragment key = {id}>
                                            <Divider component='li' key = {`${id}_divider`} /> 
                                            <ListItem alignItems='flex-start' key = {id}>
                                                <ListItemText
                                                    primary = {`${userName} (${email})`}
                                                    secondary = {body}
                                                />
                                            </ListItem>
                                             
                                        </Fragment>
                                    )}
                                </List>
                            </Grid> 
                        </Fragment>
            }
        </Grid>
    ) 
}

export default Post;