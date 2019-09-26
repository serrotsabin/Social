import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

import StaticProfile from '../components/profile/StaticProfile'
import ScreamSkeleton from '../utils/ScreamSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton'

class user extends Component {

    constructor(props){
        super(props)
        this.state = {
            profile: null,
            screamIdParam: null
        }
    }

    componentDidMount(){
        const hanlde = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId

        if(screamId){
            this.setState({
                screamIdParam:screamId
            })
        }

        this.props.getUserData(hanlde)
        axios.get(`/user/${hanlde}`)
            .then(res=>{
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err=>{
                console.log(err)
            }) 
    }

    render() {
        const {screams,loading} = this.props.data

        const {screamIdParam} = this.state
        const screamsMarkup = loading ? (
            <p><ScreamSkeleton /></p>
        ):(
            screams===null?(
                <p>No screams from this user</p>
            ):!screamIdParam?(
                screams.map(scream=><Scream key={scream.screamId} scream={scream}/>)
            ):(
                screams.map(scream=>{
                    if(scream.screamId!==screamIdParam){
                        return <Scream key={scream.screamId} scream={scream}/>
                    }else {
                        return <Scream key={scream.screamId} scream={scream} openDialog/>
                    }
                })
            )
        )
        return (
            <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile?
                <StaticProfile profile={this.state.profile} />:<p><ProfileSkeleton /></p>}
            </Grid>
        </Grid>
        )
    }
}

const mapStateToProps  = state => ({
    data: state.data
})

const mapDispatchTopProps = {
    getUserData
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchTopProps)(user)
