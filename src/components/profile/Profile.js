import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//Icon Stuffs.
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

import dayjs from 'dayjs';
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import {uploadImage , logoutUser} from '../../redux/actions/userActions';

import EditDetails from './EditDetails';
import CustomButton from '../../utils/CustomButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton'

const styles = theme =>({
    ...theme.spreadThis
})

class Profile extends Component {

    handleLogout = () => {
        this.props.logoutUser()
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];

        const formData = new FormData();
        formData.append('image', image , image.name);

        this.props.uploadImage(formData);
    }

    render() {
        const {
            classes,
            user:{ 
                    credentials : {handle, createdAt,imageUrl,bio,website,location},
                    loading,
                    authenticated
                },
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile} >
                        <div className='image-wrapper'>
                            <img
                                className='profile-image' 
                                src={imageUrl} 
                                alt ='profile' />
                            <input type='file' 
                                id='imageInput'
                                hidden='hidden'
                                onChange={this.handleImageChange} />
                            <CustomButton 
                                tip = 'Edit profile picture'
                                onClick = {this.handleEditPicture}
                                btnClassName = 'button'>
                                    <EditIcon color='primary' />                                    
                            </CustomButton>
                        </div>
                        <hr/>
                        <div className='profile-details'>
                            <MuiLink 
                                component = {Link} 
                                to={`/users/${handle}`}  
                                color='primary' 
                                variant='h5'>
                                    @{handle}
                            </MuiLink>
                            <hr/>
                            {bio && <Typography variant='body2'>{bio}</Typography>}
                            {location && (
                                <Fragment>
                                    <LocationOn color='primary' /> <span>{location}</span>
                                    <hr/>
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color='primary' /> 
                                    <a 
                                        href={website} 
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                         {' '}{website}
                                    </a>
                                    <hr/>
                                </Fragment>
                            )}
                            <CalendarToday color='primary' />{' '}
                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>                          
                        </div>
                        <CustomButton 
                                tip = 'Logout'
                                onClick = {this.handleLogout}>
                                    <KeyboardReturn color = 'primary'/>                                    
                        </CustomButton>
                        <EditDetails />
                    </div>
                </Paper>
            ):(
                <Paper className={classes.paper}>
                    <div className={classes.buttons}>
                    <Typography variant='body2' align='center'>
                        No Profile Found
                            <br/>
                            <Button variant='contained' color='primary' component = {Link} to='/login'>
                                Login
                            </Button>
                            <Button variant='contained' color='secondary' component = {Link} to='/signup'>
                                Sign Up
                            </Button>
                    </Typography>
                    </div>
                </Paper>
            ) 
        ):(
            <span><ProfileSkeleton /></span>
        )

        return profileMarkup
    }
}

const mapStateToProps =(state)=>{
    return {
        user:state.user
    }
}

const mapDispatchToProps = {
    uploadImage,
    logoutUser
}

Profile.propTypes ={ 
    user:PropTypes.object.isRequired,
    uploadImage:PropTypes.func.isRequired,
    logoutUser:PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile))
