import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Signup(props) {
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(true)
    const [modal1, setModal1] = useState(false)

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    React.useEffect(() => {
        let address = localStorage.getItem("address");
        if (address)
            alert("You seem to already have an account. You may lose that account if you have not saved the recovery key and try to signup.")
        // props.history.push('/login')
    }, [])

    const classes = useStyles();

    const OnmodalAccept = () => {
        if (state.checkedA && state.checkedB && state.checkedC && true) {
            const mnemonic = bip39.generateMnemonic()
            let HDwallet = etherHDkey.fromMasterSeed(mnemonic)
            let zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
            var etherTransfer1 = {
                "to": zeroWallet.getAddressString(),
                "value": 5000000000000000000,
                "gasLimit": 2000000
            };
            web3.eth.accounts.signTransaction(etherTransfer1, '0xB90661473A8C66C3EABE255CBE1E9680920DE19CD88E0FF0AC9345BCF842E09A').then(result => {
                web3.eth.sendSignedTransaction(result.rawTransaction)
                    .on('confirmation', async function (confirmationNumber, receipt) {
                        console.log(confirmationNumber, receipt);
                    })
            })
            // axios.post('https://www.iotconekt.com/api/dashboard/getEther', { "address":zeroWallet.getAddressString() , "amount": 30000000000000000000 })
            // console.log(zeroWallet.getAddressString(), zeroWallet.getPrivateKeyString(), keyStore);
            // let keyStore = zeroWallet.toV3(password, [])
            // const element = document.createElement("a");
            // const file = new Blob([JSON.stringify(keyStore)], { type: 'text/plain' });
            // element.href = URL.createObjectURL(file);
            // element.download = "myFile.txt";
            // document.body.appendChild(element); // Required for this to work in FireFox
            // element.click();
            // localStorage.setItem("keyStore", JSON.stringify(keyStore));
            var doc = new jsPDF()
            doc.text(mnemonic, 10, 10)
            doc.save('recovery key.pdf')
            passworder.encrypt(password, JSON.stringify({ mnemonic: mnemonic, privateKey: zeroWallet.getPrivateKeyString() }))
                .then(function (blob) {
                    sessionStorage.setItem("privateKey", zeroWallet.getPrivateKeyString())
                    localStorage.setItem("data", JSON.stringify(blob));
                    localStorage.setItem("address", zeroWallet.getAddressString());
                    props.history.push('/register')
                })
        } else {

        }
    }

    const handleSignup = async (e) => {
        if (password === "" || checkPassword === "" || password !== checkPassword) {
            setError(true);
        }
        else {
            e.preventDefault();
            setModal1(true);
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
                            onClick={handleSignup}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={(error !== error2)}
                        >
                            Sign Up
                      </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
            <Dialog
                open={modal1}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { setModal1(false) }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Please take some time to understand this for your own safety. 🙏"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedA}
                                    onChange={handleChange('checkedA')}
                                    value="checkedA"
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                            }
                            label="Do not lose it! It cannot be recovered if you lose it."

                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedB}
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                            }
                            label="Do not share it! Your Identity will be stolen if you use this file on a malicious/phishing site."

                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedC}
                                    onChange={handleChange('checkedC')}
                                    value="checkedC"
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                />
                            }
                            label="Make a backup! Secure it like the millions of dollars it may one day be worth."
                        />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={OnmodalAccept} color="primary">
                        Agree & Download
          </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
