import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { addNewDoc, closeDocModal } from '../actions/userActions';
import UploadFile from "views/DocConekt/UploadFile";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width:theme.spacing(104)
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const RegisterDocModal = (props) =>  {  

  return (
    <div>
      <Dialog
        onClose={props.closeDocModal}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={props.user.docModalOpen}
        maxWidth = "xl"
        
      >
        <DialogTitle id="customized-dialog-title" onClose={props.closeDocModal}>
          {/* DocConekt */} &nbsp;
        </DialogTitle>
        <DialogContent dividers>
          <UploadFile projectList= {props.projectList} history={props}  />
        </DialogContent>
        {/**<DialogActions>
          <Button onClick={() => {props.addNewLocation({
            latitude: String(latitude),
            longitude: String(longitude),
            name: name,
            projectID: props.projectID
          })}} color="primary">
            Add Location
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { addNewDoc, closeDocModal })(RegisterDocModal);