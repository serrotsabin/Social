import React, { Component } from 'react'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime'
import Proptypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';

import { connect } from 'react-redux'

import CustomButton from '../../utils/CustomButton'
import ChatIcon from '@material-ui/icons/Chat';

import DeleteScrem from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton';

const styles = {
    card:{
        position: 'relative',
        display:'flex',
        marginBottom: 20,
    },
    image:{
        minWidth:200,
        objectFit: 'cover'
    },
    content:{
        padding:25,
    }
}

class Scream extends Component {

    render() {
        dayjs.extend(relativeTime)
        const {
            classes, 
            scream:{ body, createdAt, userImage, userHandle, screamId, likeCount, commentCount},
            user: {
                authenticated,
                credentials:{handle}
            }
        } = this.props

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScrem screamId = {screamId} />
        ): null

        return (
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent
                    className={classes.content}>
                    <Typography 
                        variant='h5' 
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}>
                            {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography 
                        variant='body2'
                        color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <CustomButton tip='Comments'>
                        <ChatIcon color = 'primary'/>
                    </CustomButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: Proptypes.object.isRequired,
    scream: Proptypes.object.isRequired,
    classes:Proptypes.object.isRequired,
    openDialog:Proptypes.bool
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}



export default connect(mapStateToProps)(withStyles(styles)(Scream))
