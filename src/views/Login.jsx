import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import web3 from '../web3';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  Snackbar,
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import loginImage from "assets/images/login.png";
var passworder = require('browser-passworder')

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+ loginImage +')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [keystore, setKeystore] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    if(props.auth.isAuthenticated){
      props.history.push('/dashboard/home');
    }
    let address = localStorage.getItem("address");
    let temp = localStorage.getItem("data");
    if (temp === null) {
      alert("No account Found!")
      props.history.push('/signup')
    } else {
      setKeystore(JSON.parse(temp));
      setAddress(address);
    }
  }, [])


  const handleSignup = async (e) => {
    e.preventDefault();
    passworder.decrypt(password, keystore)
      .then(function (result) {
        sessionStorage.setItem("privateKey", JSON.parse(result).privateKey)
        sessionStorage.setItem('timestamp', Date.now())
        props.loginUser({address:address,data:result},props.history);
      })
      .catch((reason) => {
        console.error(reason)
        setOpen(true);
      })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {props.errors.message && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={true}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.errors.message}</span>}
      />}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={600000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Your password is invalid. Please try again.</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="secondary"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Address"
              name="email"
              value={address || ''}
              disabled={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignup}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recover" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
