import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';

import logo from '../images/logo.gif';

import {connect} from 'react-redux';

import { loginUser } from '../redux/actions/userActions'

const styles = (theme)=> ({...theme.spreadThis})


export class login extends Component {
    
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        }
    }

    handleChange = (event)=>{
        let name = event.target.name
        let value = event.target.value

        this.setState({
            [`${name}`]:value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        
        const userData = {
            email:this.state.email,
            password:this.state.password
        }

        this.props.loginUser(userData,this.props.history)
    }

    render() {
        const { 
                classes,
                UI:{loading}
             } = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img
                    className ={classes.image}
                    src={logo} alt="Logo"/>
                    <Typography 
                        variant='h3' 
                        className={classes.pageTitle}>
                            Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            value={this.state.email}
                            helperText={errors.email}
                            error={errors.email? true:false}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password? true:false}
                            onChange={this.handleChange}
                            fullWidth/>
                        {errors.error && 
                            <Typography 
                                variant = 'body2'
                                className={classes.customError}>
                                    {errors.error}
                            </Typography>
                        }
                        <Button
                            disabled={loading}
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}>
                                Login
                                {loading && (
                                    <CircularProgress 
                                        size={20}
                                        className={classes.progress}/>
                                )}
                        </Button>
                        <div style={{marginTop:'10px'}}>
                        <small>Don't have an account? Sign up <Link to='./signup'>Here</Link></small>
                        </div>
                    </form>
                </Grid>
                <Grid item sm/>                
            </Grid>
        )
    }
}

login.propTypes ={
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    user: state.user,
    UI: state.UI
})

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(login))
