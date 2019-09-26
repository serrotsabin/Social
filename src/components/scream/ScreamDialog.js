import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../utils/CustomButton'

import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Grid from '@material-ui/core/Grid'
import Typogrophy from '@material-ui/core/Typography'

import ChatIcon from '@material-ui/icons/Chat';

import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'

import {connect} from 'react-redux';
import {getScream , clearErrors} from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';

import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = theme => ({
    ...theme.spreadThis,
    profileImage:{
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent:{
        padding: 20
    },
    closeButton:{
        position: 'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }

})

class ScreamDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            oldPath:null,
            newPath:null
        }
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }

    handleOpen = () =>{
        let oldPath = window.location.pathname
        let {userHandle,screamId} = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath===newPath) oldPath = `/user/${userHandle}`

        window.history.pushState(null,null,newPath);

        this.setState({
            open: true,
            oldPath,
            newPath
        })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () =>{
        window.history.pushState(null,null,this.state.oldPath)
        this.setState({
            open: false
        })
        this.props.clearErrors()
    }

    render() {
        const {
            classes ,
            scream: {screamId,body,createdAt,likeCount,commentCount,userImage,userHandle,comments},
            UI: {loading }
        } = this.props

        const dialogMarkup = loading?(
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} />
            </div>
        ):(
            <Grid container spacing={4} >
                <Grid item sm={5}>
                    <img src={userImage} alt='Profile' className={classes.profileImage} />
                </Grid>
                <Grid item sm={6}>
                    <Typogrophy
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                    </Typogrophy>    
                    <hr className={classes.invisibleSeparator}/>
                    <Typogrophy 
                        variant='body2'
                        color='textSecondary'>
                            {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
                    </Typogrophy>
                    <hr className={classes.invisibleSeparator}/>
                    <Typogrophy
                        variant='body1'>
                            {body}
                    </Typogrophy>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <CustomButton tip='Comments'>
                        <ChatIcon color = 'primary'/>
                    </CustomButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.invisibleSeparator}/>
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        )

        return (
            <Fragment>
                <CustomButton 
                    onClick={this.handleOpen}
                    tip='Expand Scream'
                    tipClassName={classes.expandButton}>
                        <UnfoldMore color = 'primary' />
                </CustomButton>
                <Dialog
                    fullWidth
                    onClose={this.handleClose}
                    open={this.state.open}
                    maxWidth='sm'>
                        <CustomButton
                            tip='Close'
                            onClick={this.handleClose}
                            tipClassName={classes.closeButton}>
                                <CloseIcon />
                        </CustomButton>  
                        <DialogContent
                            className={classes.dialogContent}>
                                {dialogMarkup}
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        scream: state.data.scream,
        UI: state.UI
    }
}
const mapDispatchToProps ={
    getScream,
    clearErrors
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.array.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ScreamDialog))



