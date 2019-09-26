import React, { Component } from 'react'
import  Grid  from '@material-ui/core/Grid'
import Profile from '../components/profile/Profile'

import Scream from '../components/scream/Scream'
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { getScreams} from '../redux/actions/dataActions'

import ScreamSkeleton from '../utils/ScreamSkeleton'

export class home extends Component {
    
    componentDidMount(){
        this.props.getScreams()
    }
    
    render() {
        let { screams, loading} = this.props.data
        let recentScreamsMarkup = !loading ? screams.map(scream=>{
            return <Scream key={scream.screamId} scream={scream} />
        }):<span><ScreamSkeleton /></span>
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
const mapDispatchToProps = {
    getScreams,
}

home.propTypes = {
    data: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,mapDispatchToProps)(home)
