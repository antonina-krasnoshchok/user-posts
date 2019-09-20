import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUser } from '../../actions';
import { getUsers, getError } from '../../selectors';

const User = ({ match }) => {
    const dispatch = useDispatch();

    const users = useSelector(state => getUsers(state));
    const isError = useSelector(state => getError(state));

    const userId = +match.params.userId;
    const user = users.find(({ id }) => id === userId);

    useEffect(() => {
        if (!user) dispatch(getUser(userId));
    }, [user]);

    const setUserInfo = () => {
        const { 
            name, 
            username, 
            email, 
            address: { 
                street, 
                suite, 
                city,
                zipcode },
            phone,
            website,
            company: {
                name: companyName
            }
        } = user;

        return (
            <List>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Name:' secondary = {name} />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Username:' secondary = {username} />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Email:' secondary = {email} />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText 
                        primary = 'Address:' 
                        secondary = {`${street}, ${suite}, ${city}, ${zipcode}`} 
                    />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Phone:' secondary = {phone} />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Website:' secondary = {website} />
                </ListItem>
                <ListItem alignItems='flex-start'>
                    <ListItemText primary = 'Company:' secondary = {companyName} />
                </ListItem>
            </List>
        )
    }
    
    return (
        <Grid container spacing = {0}>
            {( isError ) ? 
                <Grid item xs = {12}>
                    <Typography variant = 'h5' color = 'secondary'>
                        Can't load user
                    </Typography>
                </Grid>
                : 
                (!user) ? 
                    <Typography variant = 'subtitle1'>
                        <CircularProgress />
                    </Typography>
                    :
                    <Grid item xs = {12}>
                        {setUserInfo()}
                    </Grid>
            }
        </Grid>
    );
}

export default User;