import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit'
import CustomButton from '../../utils/CustomButton'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float:'right'
    }
})

class EditDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
            bio:'',
            website:'',
            location:'',
            open:false
        }
    }

    componentDidMount(){
        let { credentials } = this.props
        this.mapUserDetailsToState(credentials)
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio?credentials.bio:'',
            website: credentials.website?credentials.website:'',
            location: credentials.location?credentials.location:''
        })
    }

    handleOpen = () =>{
        this.setState({
            open: true
        })
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () =>{
        this.setState({
            open: false
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () =>{
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails)
        
        this.handleClose()
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <CustomButton 
                    tip = 'Edit Details'
                    onClick = {this.handleOpen}
                    btnClassName={classes.button}
                    >
                    <EditIcon color = 'primary'/>                                    
                </CustomButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                        <DialogTitle>Edit Your Details</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    name='bio'
                                    type='text'
                                    label='Bio'
                                    multiline
                                    rows='3'
                                    placeholder= 'A short bio about yourself'
                                    className = {classes.textField}
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    fullWidth/>
                                <TextField
                                    name='website'
                                    type='text'
                                    label='Website'
                                    placeholder= 'Your Website Link'
                                    className = {classes.textField}
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    fullWidth/>
                                <TextField
                                    name='location'
                                    type='text'
                                    label='Location'
                                    placeholder= 'Your Location'
                                    className = {classes.textField}
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    fullWidth/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color = 'primary'>
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color = 'primary'>
                                Save
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>            
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        credentials : state.user.credentials
    }
}

const mapDispatchToProps = {
    editUserDetails
}

EditDetails.propTypes = {
    credentials: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditDetails))
