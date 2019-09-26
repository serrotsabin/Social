import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions'

//Change comment Count after adding comments.

const styles = theme =>({
    ...theme.spreadThis
})

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            body: '',
            errors: {}
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        this.props.submitComment(this.props.screamId,{body:this.state.body})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                errors:{},
                body:''
            })
        }
    }
    render() {
        const {classes, authenticated } = this.props;
        let {errors} = this.state
        const commentFormMarkup = authenticated?(
            <Fragment>
                <Grid 
                    style={{textAlign:'center'}}
                    item sm={12}>
                    <form 
                        onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Comment on Scream'
                                error = {errors.comment? true: false}
                                helperText ={errors.comment}
                                value = {this.state.body}
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.textField} />
                            <Button 
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}>
                                    Submit
                            </Button>                                                               
                    </form>
                    <hr className={classes.visibleSeparator} />
                </Grid>
            </Fragment>
        ):null        
        return (
            commentFormMarkup
        )
    }
}

const mapDispatchToProps ={
    submitComment
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated:state.user.authenticated        
})

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes:PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CommentForm))
