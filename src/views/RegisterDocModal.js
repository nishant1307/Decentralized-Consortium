import React, {Suspense, useState} from 'react';
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { connect } from 'react-redux';
import { addNewDoc, closeDocModal } from '../actions/userActions';

import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  TextField,
  Slide,
  LinearProgress,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const UploadFile = React.lazy(() => import('views/DocConekt/UploadFile'));
// import UploadFile from "views/DocConekt/UploadFile";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" timeout={5000} ref={ref} {...props} />;
});

const loading = <LinearProgress />;

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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const RegisterDocModal = (props) =>  {
  // console.log(props);
  

  return (
    <div>
      <Dialog
        onClose={props.closeDocModal}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={props.user.docModalOpen}
        maxWidth = "xl"
        full
      >
      <Suspense fallback={loading}>
        <DialogContent dividers>
          <UploadFile projectID={props.projectID === undefined ? undefined : props.projectID}  projectList= {props.projectList} {...props}  />
        </DialogContent>
      </Suspense>
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
