import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';

import {connect} from 'react-redux';

import { signupUser } from '../redux/actions/userActions'

import logo from '../images/logo.gif';


//export to main theme.
const styles = (theme)=> ({...theme.spreadThis})

export class signup extends Component {
    
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
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
        
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle           
        }

        this.props.signupUser(newUserData,this.props.history)
    }

    render() {
        const { classes, UI:{loading} } = this.props;
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img
                    className ={classes.image}
                    src={logo} alt="Logo"/>
                    <Typography 
                        variant='h4' 
                        className={classes.pageTitle}>
                            Sign Up
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
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword? true:false}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            className={classes.textField}
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle? true:false}
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
                                Sign Up
                                {loading && (
                                    <CircularProgress 
                                        size={20}
                                        className={classes.progress}/>
                                )}
                        </Button>
                        <div style={{marginTop:'10px'}}>
                        <small>Already have an account? Login <Link to='./login'>Here</Link></small>
                        </div>
                    </form>
                </Grid>
                <Grid item sm/>                
            </Grid>
        )
    }
}

signup.propTypes ={
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}

const mapStateToProps = (state)=>{
    return {
        user: state.user,
        UI: state.UI        
    }
}

const mapDispatchToProps = {
    signupUser
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(signup))
