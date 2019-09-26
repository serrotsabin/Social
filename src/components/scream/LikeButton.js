import React, { Component } from 'react'
import CustomButton from '../../utils/CustomButton';


import Proptypes from 'prop-types';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core'

import { likeScream, unlikeScream} from '../../redux/actions/dataActions';


const styles = theme =>({
    ...theme.spreadThis,
})

class LikeButton extends Component {

    likedScream = ()=>{
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)){
            return true
        }else{
            return false
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }

    render() {
        const {
            user: {
                authenticated,
            }
        } = this.props
        const likeButton = !authenticated ? (
            <CustomButton 
                tip = 'Like'>
                    <Link to='/login'>
                        <FavoriteBorderIcon color = 'primary'/>                        
                    </Link>
            </CustomButton>
        ):(
            this.likedScream() ? (
                <CustomButton tip = 'Unlike' onClick={this.unlikeScream}>
                    <FavoriteIcon color='primary'/>
                </CustomButton>
            ):(
                <CustomButton tip = 'Like' onClick={this.likeScream}>
                    <FavoriteBorderIcon color = 'primary'/>
                </CustomButton>
            )
        )

        return (
            likeButton
        )
    }
}

LikeButton.propTypes = {
    user:Proptypes.object.isRequired,
    screamId:Proptypes.string.isRequired,
    likeScream:Proptypes.func.isRequired,
    unlikeScream:Proptypes.func.isRequired,
}

const mapDispatchToProps ={
    likeScream,
    unlikeScream
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LikeButton))
