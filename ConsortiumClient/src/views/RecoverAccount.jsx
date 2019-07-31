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

export default function RecoverAccount() {
    const classes = useStyles();
    const [key, setKey] = useState('');
    const [typeOfKey, setTypeOfKey] = useState(false);
    const [error, setError] = useState(false)

    const handleRecover = async (e) => {
        e.preventDefault();
        if (typeOfKey) {
            try {
                let account = await web3.eth.accounts.privateKeyToAccount(key)
                if (web3.utils.isAddress(account.address)) {
                    console.log("proper address", account);
                    sessionStorage.setItem("privateKey",JSON.stringify({address:account,privateKey:key}))
                } else {
                    setError(true)
                }
            } catch (err) {
                setError(true)
            }

        } else {
            let HDwallet = etherHDkey.fromMasterSeed(key)
            let zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
            sessionStorage.setItem("privateKey",JSON.stringify({address:zeroWallet.getAddressString(),privateKey:zeroWallet.getPrivateKeyString()}))
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            error={error}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Enter Seed Words or Private Key"
                            name="password"
                            autoFocus
                            helperText={error ? "Please check your Input." : ''}
                            onChange={(e) => {
                                setKey(e.target.value);
                                setTypeOfKey(e.target.value.substring(0, 2) === "0x" ? true : false)
                            }}
                        />
                        <Button
                            onClick={handleRecover}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={error}
                        >
                            Recover
            </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
