import React, { Component , Fragment } from 'react'
import Proptypes from 'prop-types';
import CustomButton from '../../utils/CustomButton'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
 
const styles = theme =>({
    ...theme.spreadThis,
    deleteButton:{
        position: 'absolute',
        top: '10%',
        left:'90%'
    }
})

class DeleteScream extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }

    handleOpen = () =>{
        this.setState({open:true})
    }

    handleClose = () =>{
        this.setState({open:false})
    }

    deleteScream = () =>{
        this.props.deleteScream(this.props.screamId)
        this.setState({
            open: false
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <CustomButton tip = 'Delete Scream'
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                        <DeleteOutline color='secondary' />
                </CustomButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                        <DialogTitle>
                            Are you sure you want to delete the Scream ?
                        </DialogTitle>
                        <DialogActions>
                            <Button
                                onClick = {this.handleClose}
                                color = 'primary'>
                                    Cancel
                            </Button>
                            <Button 
                                onClick = {this.deleteScream}
                                color = 'secondary'>
                                    Delete
                            </Button>
                        </DialogActions>
                </Dialog> 
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    deleteScream
}

DeleteScream.propTypes = {
    deleteScream: Proptypes.func.isRequired
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(DeleteScream))
