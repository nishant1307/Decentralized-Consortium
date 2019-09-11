import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone'
import ipfs from "ipfs";
import { connect } from 'react-redux';
const Ipfs = require('ipfs-http-client')
import { registryContract, registryAddress } from '../../registryContract';
import web3 from '../../web3';
import uuidv1 from 'uuid/v1';
import moment from "moment";
import {decryptMessage} from "utils";
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
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Eula from "views/KYC/Eula";

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
                    <Button style={{float: "right"}} variant="contained" color="primary" onClick={props.triggerDecrypt}>Submit</Button>
                    {props.decryptedEmail && props.decryptedEmail}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function UserDetails(props) {
    const { state, handleChange, handleAddressChange, handleSelect } = props;
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
                        autoComplete="companyName"
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
                        label="Email"
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

const steps = ['Enter passcode', 'Company & Personal Details', 'KYC Documents', 'Terms of Service'];

function Invitation(props) {
    const address = localStorage.getItem('address');
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const [ipfsCompanyHash, setIPFSCompanyHash] = useState([]);
    const [ipfsOwnerHash, setIPFSOwnerHash] = useState([]);
    const [passcode, setPasscode] = useState('');
    const [button, setButton] = useState(false)
    const [state, setState] = useState({
        companyName: '',
        fullName: '',
        email: ''
    })
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitForm = async () => {
        setActiveStep(activeStep + 1);
        const privateKey = await sessionStorage.getItem('privateKey')
        // const orgBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs:ipfsCompanyHash,info:state}))
        // const orgHash = await ipfs.add(orgBuffer);
        const userBuffer = Ipfs.Buffer.from(JSON.stringify({ Docs:ipfsOwnerHash,info:state}))
        const userHash = await ipfs.add(userBuffer);
        var transaction = {
            "to": registryAddress,
            "data": registryContract.methods.registerInvitedUser(
              state.email,
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
                    setActiveStep(4);
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
        console.log(address);
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
                            console.log(err, newHash);
                            setIPFSOwnerHash([...ipfsOwnerHash, newHash[0].hash])
                        })
                    }
                });
        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0: return <InvitationPasscode setPasscode={(e)=>setPasscode(e.target.value)} triggerDecrypt={triggerDecrypt}/>
            case 1:
                return <UserDetails handleChange={handleChange} handleAddressChange={handleAddressChange} handleSelect={handleSelect} state={state} />;
            case 2:
                return <KYCDocuments setDoc={handleDoc} />;
            case 3:
                return <Eula />;
            default:
                throw new Error('Unknown step');
        }
    }

    const triggerDecrypt = () => {
      const queryString = require('query-string');
      const parsed = queryString.parse(props.location.search);
      console.log(parsed.inviteID);
      console.log("Changed", passcode);
      try{
        let decryptedEmail = decryptMessage(parsed.inviteID, passcode);
        if(decryptedEmail!=null){
          setButton(true);
          setState(state=> ({
            ...state,
            email: decryptedEmail
          }))
        }

      }catch(err){
        console.error(err);
      }

    };

    useEffect(() => {
      registryContract.methods.getInvitedUserOrganizationDetails(state.email).call({
          from: address
      }).then(res => {
        setState(state => ({
          ...state,
          companyName: res.name
        }))
      });
        registryContract.methods.getUserKYCStatus().call({
            from: address
        }).then(res => {
            if (res === "0") {
                setActiveStep(4);
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
        </React.Fragment>
    );
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps)(Invitation)
