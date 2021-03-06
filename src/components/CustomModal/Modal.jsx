import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
  Typography,
  Slide,
  IconButton,
  useMediaQuery
} from '@material-ui/core';
import {useTheme, withStyles} from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" timeout={5000} ref={ref} {...props} />;
});

const Modal = ((props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = theme => ({
    root: {
      margin: 0,
      width:theme.spacing(104),
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
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
      </MuiDialogTitle>
    );
  });

  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
  }))(MuiDialogActions);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onClose}
        scroll={'paper'}
        maxWidth = "xl"
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title" onClose={props.onClose}>{props.title}</DialogTitle>
        <DialogContent style={{padding: "20px"}}>
            {props.content}
        </DialogContent>
        <DialogActions>
          {props.action}
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Modal;
