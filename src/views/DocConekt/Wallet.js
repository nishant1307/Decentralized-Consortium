import React , {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {docContract} from "../../DocContract";
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import web3 from '../../web3';
const address = localStorage.getItem("address");
const privateKey = sessionStorage.getItem('privateKey')

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 20px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
      progress2: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop:"10%"
  },
}));

function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
    );
  }

  Title.propTypes = {
    children: PropTypes.node,
  };

  function PaymentForm() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");
    const [addressTo, setAddress] = useState("");
    const [loader, setLoader] = React.useState(true);
    const [progress, setProgress] = React.useState(0);
    const [tokenToAccept, settokenToAccept] = React.useState("");
    const [reasonToAccept, setreasonToAccept] = React.useState("");
    const [AddressFromAccept, setAddressFromAccept] = React.useState("");
    const [isReasonFetched, setIsReasonFetched] = React.useState(false);
    const [listOfTokensToAccept, setListOfTokensToAccept] = React.useState([]);
    const [listOfTokensToSend, setListOfTokensToSend] = React.useState([]);
    // let listOfTokensToAccept = [];
    // let listOfTokensToSend = ["d755a340-a937-11e9-b1fa-a35d012c1b57", "7abdc2b0-a938-11e9-b05a-ff0fae9355c6", "9f1fb9b0-a938-11e9-8582-1536f9ecf997", "c2721570-a938-11e9-ba3c-8d807a0f5cd0"];

    async function fetch() {
        // let temp = await localStorage.getItem('rememberMe');
        // let data = JSON.parse(temp);
        let toAccept = await docContract.methods.tokenToAccept(address).call();
        setListOfTokensToAccept(toAccept);
        // listOfTokensToAccept = toAccept
        console.log(toAccept, "toAccept");
        let toSend = await docContract.methods.tokenOfOwner(address).call();
        setListOfTokensToSend(toSend);
        // listOfTokensToSend = toSend;
        console.log(toSend, "toSend");
        setLoader(false);
    }

    React.useEffect(() => {
        fetch();
        // const timer = setInterval(fetch, 10000);
        // return () => {
        //     clearInterval(timer);
        // };
    }, []);


    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);


    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }
        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    async function handleAcceptance() {
        console.log(tokenToAccept);
        if (!isReasonFetched) {
            let fetchReason = await docContract.methods.getTransferReason(tokenToAccept).call();
            console.log(fetchReason);
            setreasonToAccept(fetchReason[1]);
            setAddressFromAccept(fetchReason[0])
            setIsReasonFetched(true);
        } else {
            setLoader(true);
            // let temp = await localStorage.getItem('rememberMe');
            // let data = JSON.parse(temp);
            let gasPrice = await web3.eth.getGasPrice();
            var transaction = {
                "to": "0x5e76fad4e6d429ac60109d377555ded794aa2f12",
                "data": docContract.methods.acceptToken(AddressFromAccept, tokenToAccept).encodeABI(),
                gasPrice: gasPrice
            };
            transaction["gasLimit"] = 8000000;
            web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
                web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function (confirmationNumber, receipt) {
                    if (confirmationNumber == 1) {
                        if (receipt.status == true) {
                            console.log(receipt, "hash");
                            setLoader(false);
                            setAddressFromAccept('');
                            settokenToAccept('');
                            setreasonToAccept('');
                            setIsReasonFetched(false);
                        }
                    }
                })
                    .on('error', async function (error) {
                        console.log(error);
                        setLoader(false);
                        setIsReasonFetched(false);
                    })
            });
        }
    }

    async function handleTransfer() {
        setLoader(true);
        // let temp = await localStorage.getItem('rememberMe');
        // let data = JSON.parse(temp);
        let gasPrice = await web3.eth.getGasPrice();
        var transaction = {
            "to": "0x5e76fad4e6d429ac60109d377555ded794aa2f12",
            "data": docContract.methods.transferFrom(address, addressTo, name, reason).encodeABI(),
            gasPrice: gasPrice
        };
        transaction["gasLimit"] = 8000000;
        web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
            console.log(result.rawTransaction);
            web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function (confirmationNumber, receipt) {
                if (confirmationNumber == 1) {
                    if (receipt.status == true) {
                        console.log(receipt, "hash");
                        setAddress('');
                        setName('');
                        setReason('');
                        setLoader(!loader);
                    }
                }
            })
                .on('error', async function (error) {
                    console.log(error);
                    setLoader(false);
                })
        });
    }

    return (

        <main className={classes.content}>
            {/* <div className={classes.appBarSpacer} /> */}
            <Container maxWidth="lg" className={classes.container}>
                {loader && <div className={classes.progress2}>
                    <CircularProgress className={classes.progress} variant="determinate" value={progress} />
                </div>}
                {!loader &&
                    <Grid container spacing={3}>
                        {/* Recent Orders */}
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <React.Fragment>
                                    <Title>Accept Document Transfer</Title>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel htmlFor="age-simple">Token Id</InputLabel>
                                            <Select
                                                value={tokenToAccept}
                                                onChange={e => settokenToAccept(e.target.value)}
                                                inputProps={{
                                                    name: 'token id',
                                                }}
                                                fullWidth
                                            >
                                                {listOfTokensToAccept.length === 0 && <MenuItem value=" " >No Data Found</MenuItem>}
                                                {listOfTokensToAccept.length > 0 && listOfTokensToAccept.map((answer, i) => {
                                                    return (<MenuItem key={i} value={answer}>{answer}</MenuItem>)
                                                })}


                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField value={AddressFromAccept} disabled label="Address" onChange={e => setAddressFromAccept(e.target.value)} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField value={reasonToAccept} label="Reason" disabled onChange={e => setreasonToAccept(e.target.value)} fullWidth />
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAcceptance}
                                            className={classes.button}
                                        >
                                            {!isReasonFetched ? "Fetch Reason" : "Transfer"}
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <React.Fragment>
                                    <Title>Document Transfer</Title>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel htmlFor="age-simple">Token Id</InputLabel>
                                            <Select
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                inputProps={{
                                                    name: 'token id',
                                                }}
                                                fullWidth
                                            >
                                                {listOfTokensToSend.length === 0 && <MenuItem value=" " >No Data Found</MenuItem>}
                                                {listOfTokensToSend.length > 0 && listOfTokensToSend.map((answer, i) => {
                                                    return (<MenuItem key={i} value={answer}>{answer}</MenuItem>)
                                                })}


                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField required value={reason} required label="Reason for transfer" onChange={e => setReason(e.target.value)} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField required value={addressTo} required label="Address" onChange={e => setAddress(e.target.value)} fullWidth />
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleTransfer}
                                            className={classes.button}
                                        >
                                            Transfer
                                    </Button>
                                    </Grid>
                                </React.Fragment>
                            </Paper>
                        </Grid>
                        <Dashboard />
                    </Grid>}
            </Container>
        </main>
    );
}

function Dashboard() {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [loader, setLoader] = React.useState((true));
    const [progress, setProgress] = React.useState(0);
    async function fetchData() {
        let tempData = []
        let fetchedData = await docContract.methods.tokenOfOwner(address).call();
        await fetchedData.forEach(async element => {
            let reason = await docContract.methods.getTransferReason(element).call();
            let temp = await docContract.methods.tokenURI(element).call();
            let data1 = JSON.parse(temp[0]);
            // data1.timestamp = Date(data1.timestamp)
            data1.uri = temp[1]
            data1.docId = element;
            data1.reason = reason[1]
            data1.previousOwner = reason[0]
            // console.log(data1);
            tempData.push(data1)
        });
        setRows(tempData);
        setLoader(false);
    }

    React.useEffect(() => {
        setTimeout(forceUpdate, 2000);
    });

    React.useEffect(() => {
        console.log("in")
        fetchData();
    }, [])

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <main className={classes.content}>
            {/* <div className={classes.appBarSpacer} /> */}
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        {loader && <div className={classes.progress2}>
                            <CircularProgress className={classes.progress} variant="determinate" value={progress} />
                        </div>}
                        {!loader && <Paper className={classes.paper}>
                            <Title>History</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Document Id</TableCell>
                                        <TableCell>Link to Document</TableCell>
                                        <TableCell>Information</TableCell>
                                        <TableCell>Reason</TableCell>
                                        <TableCell>Previous Owner</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.timestamp}</TableCell>
                                            <TableCell>{row.fileName}</TableCell>
                                            <TableCell>{row.docId}</TableCell>
                                            <TableCell>{row.uri}</TableCell>
                                            <TableCell>{row.fileInfo}</TableCell>
                                            <TableCell>{row.reason}</TableCell>
                                            <TableCell>{row.previousOwner}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>}
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}

export default function main() {
    return (
        <div>
            <PaymentForm />

        </div>
    );
}
