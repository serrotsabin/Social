import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import CustomButton from '../../utils/CustomButton'

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

import PostScream from '../scream/PostScream'

 
export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar
                color='primary' 
                position="fixed">
                <Toolbar
                    className='nav-container'>
                    {authenticated?(
                        <Fragment>
                            <PostScream />
                            <Link to='/'>
                                <CustomButton tip='Home' >
                                    <HomeIcon/>
                                </CustomButton>
                            </Link>
                                <Notifications/>
                        </Fragment>
                    ): (
                        <Fragment>
                            <Button color='inherit' component={Link} to='/'>
                                Home
                            </Button>
                            <Button color='inherit' component={Link} to='/login'>
                                Login
                            </Button>
                            <Button color='inherit' component={Link} to='/signup'>
                                Signup
                            </Button>
                        </Fragment>
                    )
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) =>{
    return {
        authenticated: state.user.authenticated
    }
}
export default connect(mapStateToProps)(Navbar)
