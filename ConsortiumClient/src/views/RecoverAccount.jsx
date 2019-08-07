import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import web3 from '../web3';
const bip39 = require('bip39')
const etherHDkey = require('ethereumjs-wallet/hdkey')
const jsPDF = require('jspdf');
var passworder = require('browser-passworder')


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
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

export default function RecoverAccount(props) {
    const classes = useStyles();
    const [key, setKey] = useState('');
    const [typeOfKey, setTypeOfKey] = useState(false);
    const [isKeyValid, setIsKeyValid] = useState(false);
    const [keyError, setKeyError] = useState(false)
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(true)

    const checkKey = async (e) => {
        e.preventDefault();
        setIsKeyValid(true)
    }

    const handleRecover = async (e) => {
        e.preventDefault();
        if (typeOfKey) {
            try {
                let account = await web3.eth.accounts.privateKeyToAccount(key)
                if (web3.utils.isAddress(account.address)) {
                    passworder.encrypt(password, JSON.stringify({ mnemonic: "Imported Keystore", privateKey: key }))
                        .then(function (blob) {
                            localStorage.setItem("data", JSON.stringify(blob));
                            localStorage.setItem("address", account);
                            props.history.push('/login')
                        })
                } else {
                    setKeyError(true)
                }
            } catch (err) {
                setKeyError(true)
            }

        } else {
            let HDwallet = etherHDkey.fromMasterSeed(key)
            let zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
            passworder.encrypt(password, JSON.stringify({ mnemonic: key, privateKey: zeroWallet.getPrivateKeyString() }))
                .then(function (blob) {
                    localStorage.setItem("data", JSON.stringify(blob));
                    localStorage.setItem("address", zeroWallet.getAddressString());
                    props.history.push('/login')
                })
        }
    }

    return (
         <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               {!isKeyValid && <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            error={keyError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Enter Seed Words or Private Key"
                            name="password"
                            autoFocus
                            helperText={keyError ? "Please check your Input." : ''}
                            onChange={(e) => {
                                setKey(e.target.value);
                                setTypeOfKey(e.target.value.substring(0, 2) === "0x" ? true : false)
                            }}
                        />
                        <Button
                            onClick={checkKey}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={keyError}
                        >
                            Recover
            </Button>
                    </form>
                </div>}

                {isKeyValid && <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Password Reset
  </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                error={error2}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoFocus
                                value={password}
                                helperText={error2 ? "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters." : ''}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (e.target.value.length >= 8) { setError2(false) }
                                    else { setError2(true) }
                                }}
                            />
                            <TextField
                                error={error}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Confirm Password"
                                type="password"
                                name="password"
                                value={checkPassword}
                                helperText={error ? "Please confirm your password." : ''}
                                onChange={(e) => {
                                    setCheckPassword(e.target.value);
                                    if (password === e.target.value && password !== " ") { setError(false) }
                                    else { setError(true) }
                                }}

                            />
                            <Button
                                onClick={handleRecover}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={(error !== error2)}
                            >
                                Reset Password
                            </Button>
                        </form>
                    </div>}
            </Grid>
        </Grid>
    )
}
