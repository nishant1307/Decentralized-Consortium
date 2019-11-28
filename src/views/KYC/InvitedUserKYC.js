import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone'
import ipfs from "ipfs";
const bip39 = require('bip39')
const etherHDkey = require('ethereumjs-wallet/hdkey')
const jsPDF = require('jspdf');
var passworder = require('browser-passworder')
import { connect } from 'react-redux';
const Ipfs = require('ipfs-http-client')
import { registryContract, registryAddress } from '../../registryContract';
import web3 from '../../web3';
import uuidv1 from 'uuid/v1';
import moment from "moment";
import axios from 'axios';
import { decryptMessage } from "utils";
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import {
    Typography,
    Grid,
    TextField,
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Eula from "views/KYC/Eula";
import KeyCreation from './KeyCreation'
import ExistingAccount from './ExisitingAccount';
import { log } from 'util';

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
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
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
    margin: {
        margin: theme.spacing(1)
    }
}));

function KYCDocuments(props) {
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const onDrop = (type) => (acceptedFiles) => {
        let i;
        for (i = 0; i < acceptedFiles.length; i++) {
            if (type === "companyDoc")
                setCompanyDoc([...companyDoc, URL.createObjectURL(acceptedFiles[i])])
            else
                setOwnerDoc([...ownerDoc, URL.createObjectURL(acceptedFiles[i])])
        }
        props.setDoc({ acceptedFiles: acceptedFiles, type: type })
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="expDate" defaultValue="User Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("ownerDoc")}
                        accept="image/*"
                        minSize={0}
                        maxSize={1048576}
                        multiple
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                            return (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && 'Click here or drop upto 3 images'}
                                    {isDragActive && !isDragReject && "Drop it here"}
                                    {isDragReject && "File type not accepted, sorry!"}
                                    {isFileTooLarge && (
                                        <div className="text-danger mt-2">
                                            File is too large.
                              </div>
                                    )}
                                    <div style={{
                                        position: 'relative',
                                        width: '200px',
                                        height: '200px',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(102, 102, 102)',
                                        borderStyle: 'dashed',
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            )
                        }}
                    </Dropzone>
                    {ownerDoc.length > 0 ? <div>
                        <h4>{ownerDoc.length} images uploaded</h4>
                        <div>{ownerDoc.map((file) => <img src={file} key={Math.random()} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function InvitationPasscode(props) {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="passcode"
                        label="Invitation Passcode"
                        type="password"
                        value={props.passcode}
                        variant={"outlined"}
                        onChange={props.setPasscode}
                    />
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={props.triggerDecrypt}>Submit</Button>
                    {props.decryptedEmail && props.decryptedEmail}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function UserDetails(props) {
    const { state, handleChange, handleAddressChange, handleSelect } = props;
    console.log(state, "state", Math.random());
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        fullWidth
                        disabled
                        // autoComplete="companyName"
                        value={state.companyName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fullName"
                        name="fullName"
                        label="Full name"
                        fullWidth
                        onChange={handleChange}
                        autoComplete="fname"
                        value={state.fullName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Company Id"
                        disabled
                        fullWidth
                        onChange={handleChange}
                        autoComplete="lname"
                        value={state.email}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const steps = ['Enter passcode', 'Key Creation ', 'Company & Personal Details', 'KYC Documents', 'Terms of Service'];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Invitation(props) {
    const address = localStorage.getItem('address');
    const classes = useStyles();
    const [toggleState, setToggleState] = React.useState({ checkedA: false, checkedB: false, checkedC: false });
    const [activeStep, setActiveStep] = React.useState(0);
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const [error, setError] = useState(false);
    const [ipfsCompanyHash, setIPFSCompanyHash] = useState([]);
    const [ipfsOwnerHash, setIPFSOwnerHash] = useState([]);
    const [passcode, setPasscode] = useState('');
    const [button, setButton] = useState(false);
    const [isExist, setIsExist] = useState(false);
    const [modal1, setModal1] = useState(false)
    const [keystore, setKeystore] = useState('');
    const [alert, setAlert] = useState('');
    const [state, setState] = useState({
        companyName: '',
        fullName: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',
        organizationID: ''
    })
    const handleToggleChange = name => event => {
        setToggleState({
            ...toggleState,
            [name]: event.target.checked
        });
    };

    async function fetchKey() {
        // console.log("hhsh");
        // web3.eth.getBalance(address).then(console.log)
        // let address = localStorage.getItem("address");
        let temp = await localStorage.getItem("data")
        // console.log(temp,"temppppppppp");
        setKeystore(JSON.parse(temp));
        // setAddress(address);
        // console.log("hhsh2");
    }

    const handleNext = () => {
        if (activeStep === 1) {
            if (isExist) {
                fetch("https://api.arthanium.org/api/v1/faucet/" + localStorage.getItem("address")).then(res => res.json()).then((result) => {
                    console.log(result);
                }, (error) => {
                    console.log(error);
                })
                passworder.decrypt(state.password, keystore).then(function (result) {
                    sessionStorage.setItem("privateKey", JSON.parse(result).privateKey)
                    sessionStorage.setItem('timestamp', Date.now())
                    setActiveStep(activeStep + 1);
                }).catch((reason) => {
                    setAlert(<Snackbar color="danger" open={true} place="bl" className={classes.margin} message="Incorrect Password." />
                    );
                    setTimeout(
                        function () {
                            setAlert('');
                        }
                            .bind(this),
                        10000
                    );
                })
            } else {
                if (state.password === "" || state.confirmPassword === "" || state.password !== state.confirmPassword) {
                    setError(true);
                } else {
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
        // const orgBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs:ipfsCompanyHash,info:state}))
        // const orgHash = await ipfs.add(orgBuffer);
        const userBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs: ipfsOwnerHash, info: state }))
        const userHash = await ipfs.add(userBuffer);
        var transaction = {
            "to": registryAddress,
            "data": registryContract.methods.registerInvitedUser(
                state.email,
                state.organizationID,
                userHash[0].hash
            ).encodeABI()
        };

        // web3.eth.estimateGas(transaction).then(gasLimit => {
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey)
            .then(res => {
                web3.eth.sendSignedTransaction(res.rawTransaction)
                    .on('receipt', async function (receipt) {
                        // console.log(receipt);
                        setAlert(<Snackbar color="success" open={true} place="bl" className={classes.margin} message="Transaction Sent!" />
                        );
                        setTimeout(
                            function () {
                                setAlert('');
                            }
                                .bind(this),
                            10000
                        );
                        setActiveStep(4);
                    })
                    .on('error', function (error) {
                        setActiveStep(0);
                        setAlert(<Snackbar color="danger" open={true} place="bl" className={classes.margin} message="Error Occured! email already exists." />);
                        setTimeout(
                            function () {
                               
                                setAlert('');
                            }
                                .bind(this),
                            30000
                        );
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

    const OnmodalAccept = () => {
        setModal1(false);
        if (toggleState.checkedA && toggleState.checkedB && toggleState.checkedC && true) {
            const mnemonic = bip39.generateMnemonic()
            let HDwallet = etherHDkey.fromMasterSeed(mnemonic)
            let zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
            fetch("https://api.arthanium.org/api/v1/faucet/" + zeroWallet.getAddressString()).then(res => res.json()).then((result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            })
            var doc = new jsPDF()
            doc.text(mnemonic, 10, 10)
            doc.save('recovery key.pdf')
            passworder.encrypt(state.password, JSON.stringify({ mnemonic: mnemonic, privateKey: zeroWallet.getPrivateKeyString() })).then(function (blob) {
                sessionStorage.setItem("privateKey", zeroWallet.getPrivateKeyString())
                localStorage.setItem("data", JSON.stringify(blob));
                localStorage.setItem("address", zeroWallet.getAddressString());
                // props.history.push('/register')
                setActiveStep(activeStep + 1);
            })
        } else { }
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

    function getStepContent(step) {
        switch (step) {
            case 0: return <InvitationPasscode setPasscode={(e) => setPasscode(e.target.value)} triggerDecrypt={triggerDecrypt} />
            case 1: return (
                isExist
                    ? <ExistingAccount handleChange={handleChange} state={state} />
                    : <KeyCreation handleChange={handleChange} state={state} error={error} />)
            case 2:
                return <UserDetails handleChange={handleChange} handleAddressChange={handleAddressChange} handleSelect={handleSelect} state={state} />;
            case 3:
                return <KYCDocuments setDoc={handleDoc} />;
            case 4:
                return <Eula state={state} values={state} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const triggerDecrypt = () => {
        const queryString = require('query-string');
        const parsed = queryString.parse(props.location.search);
        console.log(parsed.inviteID);
        console.log("Changed", parsed);
        let inviteID2 = parsed.inviteID.replace(/ /g, "+");
        console.log(inviteID2, "inviteID2");

        try {
            let decryptedData = decryptMessage(inviteID2, passcode);
            console.log(decryptedData, "hre");
            if (decryptedData != null) {
                let data = JSON.parse(decryptedData)
                registryContract.methods.getOrganizationDetailsByorganizationID(data.organizationID).call().then(async (details) => {
                    let dataFromIPFS = await axios.get('https://gateway.arthanium.org/ipfs/' + details.kycHash)
                    console.log(details, dataFromIPFS)
                    setButton(true);
                    setState(state => ({
                        ...state,
                        email: data.email,
                        organizationID: data.organizationID,
                        companyName: details.name,
                        address: dataFromIPFS.data.info.address1 + " " + dataFromIPFS.data.info.address
                    }))
                    setActiveStep(activeStep + 1);
                })
            }
            else {
                setAlert(<Snackbar color="danger" open={true} place="bl" className={classes.margin} message="Invalid Passcode" />)
            }

        } catch (err) {
            setAlert(<Snackbar color="danger" open={true} place="bl" className={classes.margin} message="Invalid Passcode" />)
        }

    };

    useEffect(() => {
        if (localStorage.getItem("address") !== null) {
            setIsExist(true);
            fetchKey();
            fetch("https://api.arthanium.org/api/v1/faucet/" + localStorage.getItem("address")).then(res => res.json()).then((result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            })
        }
        registryContract.methods.getInvitedUserOrganizationDetails(state.email).call({
            from: address
        }).then(res => {
            console.log(res, "Resss");

            // setState(state => ({
            //     ...state,
            //     companyName: res.name
            // }))
        });
        registryContract.methods.getUserKYCStatus().call({
            from: address
        }).then(res => {
            if (res.status === "0" && res.kycHash === "") {
                setActiveStep(5);
            }
        }).catch((e) => {

            if (localStorage.getItem("address") === null) {
                // props.history.push('/signup');
            }
            else if (props.auth.isAuthenticated) {
                props.history.push('/dashboard');
            }
        })
    }, [state.email]);

    return (
        <React.Fragment>
            <CssBaseline />
            {alert}
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Arthanium Invitee
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
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                    </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={!button}
                                            onClick={activeStep === steps.length - 1 ? submitForm : handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Accept' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                </Paper>
            </main>
            <Dialog open={modal1} TransitionComponent={Transition} keepMounted="keepMounted" onClose={() => {
                setModal1(false)
            }} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Please take some time to understand this for your own safety. 🙏"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormControlLabel control={<Checkbox
                            checked={
                                toggleState.checkedA
                            }
                            onChange={
                                handleToggleChange('checkedA')
                            }
                            value="checkedA"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />} label="Do not lose it! It cannot be recovered if you lose it." />
                        <FormControlLabel control={<Checkbox
                            checked={
                                toggleState.checkedB
                            }
                            onChange={
                                handleToggleChange('checkedB')
                            }
                            value="checkedB"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />} label="Do not share it! Your Identity will be stolen if you use this file on a malicious/phishing site." />
                        <FormControlLabel control={<Checkbox
                            checked={
                                toggleState.checkedC
                            }
                            onChange={
                                handleToggleChange('checkedC')
                            }
                            value="checkedC"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />} label="Make a backup! Secure it like the millions of dollars it may one day be worth." />

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

export default connect(mapStateToProps)(Invitation)
