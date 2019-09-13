import React, { useState, useEffect } from 'react';
import ipfs from "ipfs";
import { connect } from 'react-redux';
import web3 from '../../web3';
const bip39 = require('bip39')
const etherHDkey = require('ethereumjs-wallet/hdkey')
const jsPDF = require('jspdf');
var passworder = require('browser-passworder')
const Ipfs = require('ipfs-http-client')
import { registryContract, registryAddress } from '../../registryContract';
import uuidv1 from 'uuid/v1';
import { geocodeByAddress } from 'react-places-autocomplete';
import CompnayInfo from './CompnayInfo'
import DocUpload from './DocUpload'
import Eula from './Eula'
import KeyCreation from './KeyCreation'
import ExistingAccount from './ExisitingAccount';
import { makeStyles } from '@material-ui/core/styles';
import loginImage from "assets/images/login.png";
import {
    Typography,
    CssBaseline,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Checkbox,
    FormControlLabel,
    CircularProgress
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 750,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    image: {
        backgroundImage: 'url(' + loginImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ['Account Creation', 'Company & Personal Details', 'KYC Documents', 'Terms of Service'];



function Checkout(props) {
    const address = localStorage.getItem('address');
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const [ipfsCompanyHash, setIPFSCompanyHash] = useState([]);
    const [ipfsOwnerHash, setIPFSOwnerHash] = useState([]);
    const [error, setError] = useState(false);
    const [modal1, setModal1] = useState(false)
    const [isExist, setIsExist] = useState(false)
    const [keystore, setKeystore] = useState('');
    const [loader, setLoader] = useState(true);

    // const [address, setAddress] = useState('');
    const [toggleState, setToggleState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
    });
    const [state, setState] = useState({
        companyName: '',
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        password: '',
        confirmPassword: '',
        date: new Date().getDate()
    })

    useEffect(() => {
        registryContract.methods.getUserKYCStatus().call({
            from: address
        }).then(res => {
            if (res === "0") {
                setActiveStep(5);
                setLoader(false);
            } else if (res === "1") {
                window.alert("account already exists!")
                props.history.push('/login');
            }
        }).catch((e) => {
            if (localStorage.getItem("address") === null) {
                fetchKey();
                setIsExist(false);
                setLoader(false);
            }
            else if (props.auth.isAuthenticated) {
                props.history.push('/dashboard');
            } else if (localStorage.getItem("address") !== null) {
                setActiveStep(5);
                setLoader(false);
            }
        })
    }, []);


    const handleToggleChange = name => event => {
        setToggleState({ ...toggleState, [name]: event.target.checked });
    };


    const OnmodalAccept = () => {
        setModal1(false);
        if (toggleState.checkedA && toggleState.checkedB && toggleState.checkedC && true) {
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
                        // console.log(confirmationNumber, receipt);
                    })
            })
            var doc = new jsPDF()
            doc.text(mnemonic, 10, 10)
            doc.save('recovery key.pdf')
            passworder.encrypt(state.password, JSON.stringify({ mnemonic: mnemonic, privateKey: zeroWallet.getPrivateKeyString() }))
                .then(function (blob) {
                    sessionStorage.setItem("privateKey", zeroWallet.getPrivateKeyString())
                    localStorage.setItem("data", JSON.stringify(blob));
                    localStorage.setItem("address", zeroWallet.getAddressString());
                    // props.history.push('/register')
                    setActiveStep(activeStep + 1);
                })
        } else {

        }
    }

    const handleNext = () => {
        if (activeStep === 0) {
            if (isExist) {
                passworder.decrypt(state.password, keystore)
                    .then(function (result) {
                        sessionStorage.setItem("privateKey", JSON.parse(result).privateKey)
                        sessionStorage.setItem('timestamp', Date.now())
                        setActiveStep(activeStep + 1);
                    })
                    .catch((reason) => {
                        console.error(reason)
                    })
            }
            else {
                if (state.password === "" || state.confirmPassword === "" || state.password !== state.confirmPassword) {
                    setError(true);
                }
                else {
                    setError(false);
                    setModal1(true);
                    // setActiveStep(activeStep + 1);
                }
            }
        } else {
            setActiveStep(activeStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitForm = async () => {
        setActiveStep(activeStep + 1);
        const privateKey = await sessionStorage.getItem('privateKey')
        const orgBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs: ipfsCompanyHash, info: state }))
        const orgHash = await ipfs.add(orgBuffer);
        const userBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs: ipfsOwnerHash, info: state }))
        const userHash = await ipfs.add(userBuffer);
        // console.log(state.companyName,
        //     orgHash[0].hash,
        //     userHash[0].hash,
        //     state.email, "j");
        var transaction = {
            "to": registryAddress,
            "data": registryContract.methods.setOrganizationAdmin(
                uuidv1(),
                state.companyName,
                orgHash[0].hash,
                userHash[0].hash,
                state.email
            ).encodeABI()
        };

        // web3.eth.estimateGas(transaction).then(gasLimit => {
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey)
            .then(res => {
                web3.eth.sendSignedTransaction(res.rawTransaction)
                    .on('receipt', async function (receipt) {
                        // console.log(receipt);
                        setActiveStep(5);
                    })
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(state => ({
            ...state,
            [name]: value
        }));
    }

    const handleAddressChange = address => {
        setState(state => ({
            ...state,
            address: address
        }));
    };

    const handleSelect = address => {
        setState(state => ({
            ...state,
            address: address
        }));
        // console.log(address);
        geocodeByAddress(address)
            .then(results => {
                let raw = results[0].address_components;
                setState(state => ({
                    ...state,
                    zipcode: raw[raw.length - 1]['long_name'],
                    country: raw[raw.length - 2]['long_name'],
                    state: raw[raw.length - 3]['long_name'],
                    city: raw[raw.length - 4]['long_name']
                }));
            })
            .catch(error => console.error('Error', error));
    };

    function handleDoc(data) {
        let i;
        for (i = 0; i < data.acceptedFiles.length; i++) {
            if (data.type === "companyDoc") {
                setCompanyDoc([...companyDoc, URL.createObjectURL(data.acceptedFiles[i])])
                data.acceptedFiles.forEach(element => {
                    let file = element;
                    let reader = new window.FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onloadend = (res) => {
                        let content = Ipfs.Buffer.from(res.target.result);
                        ipfs.add(content, (err, newHash) => {
                            // console.log(err, newHash);
                            setIPFSCompanyHash([...ipfsCompanyHash, newHash[0].hash])
                        })
                    }
                });

            }
            else {
                setOwnerDoc([...ownerDoc, URL.createObjectURL(data.acceptedFiles[i])])
                data.acceptedFiles.forEach(element => {
                    let file = element;
                    let reader = new window.FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onloadend = (res) => {
                        let content = Ipfs.Buffer.from(res.target.result);
                        ipfs.add(content, (err, newHash) => {
                            // console.log(err, newHash);
                            setIPFSOwnerHash([...ipfsOwnerHash, newHash[0].hash])
                        })
                    }
                });
            }
        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (isExist ? <ExistingAccount handleChange={handleChange} state={state} /> : <KeyCreation handleChange={handleChange} state={state} error={error} />)
            case 1:
                return <CompnayInfo handleChange={handleChange} handleAddressChange={handleAddressChange} handleSelect={handleSelect} state={state} />;
            case 2:
                return <DocUpload setDoc={handleDoc} />;
            case 3:
                return <Eula companyName={state.companyName} />;
            default:
                throw new Error('Unknown step');
        }
    }

    async function fetchKey() {
        // console.log("hhsh");
        // web3.eth.getBalance(address).then(console.log)
        // let address = localStorage.getItem("address");
        let temp = await localStorage.getItem("data");
        setKeystore(JSON.parse(temp));
        // setAddress(address);
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                {loader ? <CircularProgress style={{ position: 'absolute', top: "50%", left: "50%" }} /> :
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            KYC
          </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length + 1 ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you.
                </Typography>
                                    <Typography variant="subtitle1">
                                        It will take approximately 24 hours to verify your KYC.
                </Typography>
                                    <div className={classes.buttons}>
                                        <Button onClick={() => { props.history.push('/') }} className={classes.button}>
                                            Back To Home
                    </Button>
                                    </div>
                                </React.Fragment>

                            ) : (activeStep === steps.length ? (
                                <React.Fragment>
                                    <div className={classes.buttons}>
                                        <Typography variant="subtitle1">
                                            Transaction is in progress! Please Wait...
                                </Typography>
                                    </div>
                                </React.Fragment>

                            ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && activeStep !== 1 && (
                                                <Button onClick={handleBack} className={classes.button}>
                                                    Back
                    </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={activeStep === steps.length - 1 ? submitForm : handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Accept' : 'Next'}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                ))}
                        </React.Fragment>
                    </Paper>}
            </main>
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
                                    checked={toggleState.checkedA}
                                    onChange={handleToggleChange('checkedA')}
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
                                    checked={toggleState.checkedB}
                                    onChange={handleToggleChange('checkedB')}
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
                                    checked={toggleState.checkedC}
                                    onChange={handleToggleChange('checkedC')}
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
        </React.Fragment>
    );
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps)(Checkout)
