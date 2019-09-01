import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import web3 from '../../web3';
import ipfs from "../../ipfs";
import {docContract} from "../../DocContract";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {renderFromArray} from "utils";
const uuidv1 = require('uuid/v1');

const salesTypes = [
    // "Request for Quotation",
    // "Quotation",
    "Purchase Order",
    // "Proforma Invoice",
    // "Order Confirmation",
    // "Sales Confirmation",
    // "Sales Contract",
    // "Debit Note",
    // "Credit Note"
]

const shippingType = [
    "Commercial Invoice",
    "Packing List",
    // "Container Packing List",
    // "Packing Declaration",
    // "Verified Gross Mass Declaration",
    // "Certificate of Origin",
    // "Declaration of Origin",
    // "Packing list  Item",
    // "Shippers Letter of Instruction",
    "Seaway Airway Bill",
    // "Bill of Lading",
    // "Forwarding Instruction",
    "Shipping Instruction"
    // "Importer Security Filing",
    // "Declaration",
    // "Foreign Exchange Control Form",
    // "Cargo Release Order",
    // "Bill of Entry",
]

const bankType = [
    // "Letter of Credit"
]

const mainDocType = [
    "Sales Documents",
    "Shipping Documents",
    "Banking Documents"
]

const useStyles = makeStyles(theme => ({
    progress2: {
        display: 'flex',
        justifyContent: 'center',
    },
    progress: {
        margin: theme.spacing(10),
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
        width: 600,
        height: 300,
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
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        flexGrow: 1,
        width: theme.spacing(100)
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,

    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function AddressForm({ parentCallback }) {
    const captureFile = (event) => {
        const file = event.target.files[0]
        const name = event.target.files[0].name
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader, name)
    };
    const convertToBuffer = async (reader, name) => {
        console.log(reader, name);

        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
        parentCallback(buffer, name)

    };


    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Select File to Upload
        </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="file"
                            onChange={captureFile}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function PaymentForm(params) {
    const [name, setName] = useState(params.name);
    const [info, setInfo] = useState("");

    useEffect(() => {
        params.infoCallback(name, info)
    }, [info])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Document Information
        </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField required value={name} label="Name of the document" onChange={e => setName(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required value={info} label="Brief information about Document" onChange={e => setInfo(e.target.value)} fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function Review(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Transaction Receipt
        </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Transaction Hash" />
                    <p style={{ wordBreak: "break-word" }}>{props.hash}</p>
                </ListItem>
            </List>
        </React.Fragment>
    );
}

const Checkout = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [status, setStatus] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [bufferData, setBufferData] = React.useState("");
    const [fileName, setFileName] = React.useState("");
    const [fileInfo, setFileInfo] = React.useState("");
    const [variant, setVariant] = React.useState("");
    const [txHash, setTxHash] = React.useState("");
    const [progress, setProgress] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [DocType, setDocType] = React.useState(0);
    const [subDocType, setSubDocType] = React.useState("");
    const [subDocRender, setSubDocRender] = useState("");
    function handleChange(event, newValue) {
        setValue(newValue);
    }

    useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(()=> {
      setSubDocRender(getSubContent(DocType));
    }, [DocType])

    const handleNext = () => {
        console.log("in nnext");
        setActiveStep(activeStep + 1);
        // forceUpdate();
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
        // forceUpdate();
    };

    const steps = ['File Upload', 'Details', 'Upload'];

    function callback(buffer, name) {
        setBufferData(buffer);
        setFileName(name);
        // forceUpdate();
    }

    function handleInfo(name, info) {
        setFileName(name);
        setFileInfo(info);
        // forceUpdate();
    }
    const getSubContent = (count) => {
      console.log("called");
        switch (count) {
            case 0:
                return renderFromArray(salesTypes);
            case 1:
                return renderFromArray(shippingType);
            case 2:
                return renderFromArray(bankType);
            default:
                throw new Error('Unknown step');
        }
    }


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm parentCallback={callback} />;
            case 1:
                return <PaymentForm name={fileName} infoCallback={handleInfo} />;
            case 2:
                return (<div className={classes.progress2}>
                    <CircularProgress className={classes.progress} variant="determinate" value={progress} />
                </div>)
            default:
                throw new Error('Unknown step');
        }
    }

    function handleStructured() {
        props.history.push('/dashboard/structured/' + subDocType)
    }

    async function uploadFile() {
        handleNext();
        const address = await localStorage.getItem("address");
        const privateKey = await sessionStorage.getItem('privateKey');
        await ipfs.add(bufferData, async (err, ipfsHash) => {
            let gasPrice = await web3.eth.getGasPrice();
            var transaction = {
                "to": "0x5e76fad4e6d429ac60109d377555ded794aa2f12",
                "data": docContract.methods.mint(address, uuidv1(), ipfsHash[0].hash, JSON.stringify({ fileName: fileName, fileInfo: fileInfo, timestamp: Date.now() })).encodeABI(),
                gasPrice: gasPrice
            };
            // web3.eth.estimateGas(transaction).then(gasLimit => {
            // console.log(gasLimit,"gasLimit");
            transaction["gasLimit"] = 8000000;
            web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
                web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function (confirmationNumber, receipt) {
                    if (confirmationNumber == 1) {
                        if (receipt.status == true) {
                            setTxHash(receipt.transactionHash);
                            setActiveStep(3);
                            //   forceUpdate();
                            // console.log(transactionHash, "hash");
                        }
                    }
                })
                    .on('error', async function (error) {
                        console.log(error, "in error");
                        setMessage("ERROR!");
                        setVariant("error");
                        setStatus(true);
                        setActiveStep(0);
                        // forceUpdate();
                        setTimeout(
                            function () {
                                setStatus(false);
                            }
                                .bind(this),
                            8000
                        );
                    })
            });
            // });
        })
    }
    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
            >
                <Tab style={{ outline: "none" }} label="Unstructured document" {...a11yProps(0)} />
                <Tab style={{ outline: "none" }} label="Structured document" {...a11yProps(1)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                {/* <Paper className={classes.paper}> */}
                <Typography component="h1" variant="h4" align="center">
                    File Upload
          </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Review hash={txHash} />
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && activeStep !== 2 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                    </Button>
                                    )}
                                    {activeStep === 1 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={uploadFile} className={classes.button}>
                                            Upload File
                     </Button>
                                    )}
                                    {activeStep !== 1 && activeStep !== 2 && (<Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                            </Button>)}
                                </div>
                            </React.Fragment>
                        )}
                </React.Fragment>
                {/* </Paper> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <Paper className={classes.paper}> */}
                <Typography component="h1" variant="h4" align="center">
                    Select Document Type
          </Typography>
                <br /><br /><br />
                <form className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Document Type</InputLabel>
                                <Select
                                    value={DocType}
                                    onChange={(e) => setDocType(e.target.value)}
                                    input={<Input id="mainType" />}
                                >
                                    <MenuItem value={0}>{mainDocType[0]}</MenuItem>
                                    <MenuItem value={1}>{mainDocType[1]}</MenuItem>
                                    <MenuItem value={2}>{mainDocType[2]}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Sub-Type</InputLabel>
                                <Select
                                    value={subDocType}
                                    onChange={(e) => setSubDocType(e.target.value)}
                                    input={<Input id="sub-Type" />}
                                >
                                    {subDocRender}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
                <React.Fragment>
                    <div className={classes.buttons}>
                        <Link to={{ pathname:'/dashboard/structured/' + subDocType, state: { projectId: props.projectList } }}>
                            <Button
                                variant="contained"
                                color="primary"

                                className={classes.button}
                            >
                                Next
                                </Button>
                        </Link>
                    </div>
                </React.Fragment>
                {/* </Paper> */}
            </TabPanel>
        </div>
    );
}

export default (Checkout);
