import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../utils/CustomButton'

import {connect} from 'react-redux';
import { postScream , clearErrors } from '../../redux/actions/dataActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'; 
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
    ...theme.spreadThis,
    submitButton:{
        position: 'relative',
        float:'right',
        marginTop:'10'
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButtion:{
        position:'absolute',
        left:'91%',
        top:'6%'
    }
})
class PostScream extends Component {

    constructor(props){
        super(props)
        this.state = ({
            open: false,
            body:'',
            errors:{}
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({
            open: false,
            errors: {}
        })
    }

    handleChange =(event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit =(event) =>{
        event.preventDefault();
        this.props.postScream({
            body:this.state.body
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body:'',
                open: false,
                errors: {}
            })
        }
    }

    render() {
        const {errors} = this.state
        const {classes, UI:{loading}} = this.props

        return (
            <Fragment>
                <CustomButton 
                    onClick={this.handleOpen}
                    tip='Create a Scream' >
                    <AddIcon/>
                </CustomButton>
                <Dialog
                    fullWidth
                    onClose={this.handleClose}
                    open={this.state.open}
                    maxWidth='sm'>
                        <CustomButton
                            tip='Close'
                            onClick={this.handleClose}
                            tipClassName={classes.closeButtion}>
                                <CloseIcon />
                        </CustomButton>  
                        <DialogTitle>Post a new Scream</DialogTitle> 
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField 
                                    name='body'
                                    type='text'
                                    label='Scream'
                                    multiline
                                    rows='3'
                                    placeholder='Add a scream'
                                    error={errors.body?true :false}
                                    helperText={errors.body}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth/>
                                <Button 
                                    type = 'submit' 
                                    variant='contained'
                                    color='primary'
                                    className={classes.submitButton}
                                    disabled={loading}>
                                        Submit
                                        {loading &&<CircularProgress 
                                            size={30}
                                            className={classes.progressSpinner}/>
                                        }
                                    </Button>
                            </form>    
                        </DialogContent> 
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    UI: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    UI: state.UI 
})

const mapDispatchToProps = {
    postScream,
    clearErrors
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(PostScream))
