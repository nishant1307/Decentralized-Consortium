import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import web3 from '../web3';

import {
    Avatar,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import Button from "components/CustomButtons/Button"
import {makeStyles} from '@material-ui/core/styles';
import signupImage from "assets/images/signup.png";
const bip39 = require('bip39')
const etherHDkey = require('ethereumjs-wallet/hdkey')
const jsPDF = require('jspdf');
var passworder = require('browser-passworder')


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url('+signupImage+')',
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
                            localStorage.setItem("address", account.address);
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
                        Recover
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
                            round
                            color="info"
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
                                round
                                variant="rounded"
                                color="info"
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
