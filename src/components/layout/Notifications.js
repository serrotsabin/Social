import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime'
import Proptypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux';

import {markNotificationsRead} from '../../redux/actions/userActions';

class Notifications extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    handleOpen = (event) =>{
        this.setState({
            anchorEl: event.target
        })
    }

    handleClose = () =>{
        this.setState({
            anchorEl: null
        })
    }

    onMenuOpened = () => {
        let unreadNotificationsIds
        if(this.props.notifications){
            unreadNotificationsIds = this.props.notifications
            .filter(not=>!not.read)
            .map(not=>not.notificationId)
        
        this.props.markNotificationsRead(unreadNotificationsIds)}
    }

    render() {
        const notifications = this.props.notifications
        
        const anchorEl = this.state.anchorEl
        
        dayjs.extend(relativeTime)

        let notificationsIcon
        if(notifications&&notifications.length>0){
            notifications.filter(not=>not.read === false).length > 0 ?
                notificationsIcon = ( 
                    <Badge 
                        color="secondary"
                        badgeContent={notifications.filter(not=>not.read === false).length}>
                            <NotificationsIcon />
                    </Badge>)
                :(
                    notificationsIcon = <NotificationsIcon/>
                )
        }else{
            notificationsIcon = <NotificationsIcon/>
        }

        let notificationsMarkup = 
            notifications && notifications.length>0?(
            notifications.map(not=>{
                const verb = not.type==='like'? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow()
                const iconColor = not.read? 'primary': 'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon 
                        color={iconColor}
                        style={{marginRight: 10}} />
                ):(
                    <ChatIcon 
                    color={iconColor}
                    style={{marginRight: 10}} />      
                )
                return (
                    <MenuItem
                        component={Link} 
                        key={not.createdAt}
                        to={`/users/${not.recipient}/scream/${not.screamId}`} 
                        onClick={this.handleClose}>
                        {icon}
                        <Typography
                            color='default'
                            variant='body1'>
                                {not.sender} {verb} your scream {time}
                        </Typography> 
                    </MenuItem>
                )
              }) 
              ) : (
                    <MenuItem onClick={this.handleClose}>
                        You have no Notifications
                    </MenuItem>
                )
        return (
            <Fragment>
                <Tooltip
                    placement="top"
                    title="Notifications">
                        <IconButton aria-owns={anchorEl? 'simple-menu' : undefined}
                            aria-haspopup='true'
                            onClick = {this.handleOpen}>
                                {notificationsIcon}
                        </IconButton>
                </Tooltip>
                <Menu   
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                        {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

const mapStateToProps = state =>({
    notifications: state.user.notifications
})

const mapDispatchToProps = {
    markNotificationsRead
}

Notifications.propTypes = {
    markNotificationsRead:Proptypes.func.isRequired,
    notifications:Proptypes.array.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Notifications)

