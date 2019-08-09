import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Dropzone from 'react-dropzone'
import ipfs from "../../ipfs";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
// import countryCodes from "dataset/countryCodes";
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

function Review(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h7" gutterBottom>
                I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to
   inform you of any changes therein, immediately. In case any of the above information is found to be false or untrue or
   misleading or misrepresenting, I am aware that I may be held liable for it.
      </Typography>
        </React.Fragment>
    );
}

function PaymentForm() {
    const [companyDoc, setCompanyDoc] = useState([]);
    const [companyKYCHash, setCompanyKYCHash] = useState([]);
    const [userKYCHash, setUserKYCHash] = useState([]);
    const [showImages, setShowImages] = useState(false);
    const [showUserImages, setShowUserImages] = useState(false);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const onDrop = (type) => (acceptedFiles) => {
      let i;
      let length = acceptedFiles.length;
      for (i = 0; i < acceptedFiles.length; i++) {
        let file = acceptedFiles[i];
        if (type === "companyDoc")
            setCompanyDoc([...companyDoc, URL.createObjectURL(acceptedFiles[i])])
        else
            setOwnerDoc([...ownerDoc, URL.createObjectURL(acceptedFiles[i])])
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (res) => {
          let content = Buffer.from(res.target.result);
          ipfs.add(content, (err, newHash) => {
            console.log(newHash);
            if (type === "companyDoc")
              setCompanyKYCHash([...companyKYCHash, newHash[0].hash])
            else
              setUserKYCHash([...userKYCHash, newHash[0].hash])
            if (newHash.length == length ) {
              if (type === "companyDoc")
                setShowImages(true);
              else
                setShowUserImages(true)
            }
          })
        }
      }
    }
    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
                Document Upload
        </Typography> */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="cardName" defaultValue="Company Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("companyDoc")}
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
                    {(showImages && companyDoc.length > 0) ? <div>
                        <h4>{companyDoc.length} images uploaded</h4>
                        <div>{companyDoc.map((file) => <img src={file} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="expDate" defaultValue="Owner Document" fullWidth />
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
                    {(showUserImages && ownerDoc.length > 0) ? <div>
                        <h4>{ownerDoc.length} images uploaded</h4>
                        <div>{ownerDoc.map((file) => <img src={file} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
}

function AddressForm() {
  const classes = useStyles();
  const [state, setState] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    flat: '',
    state: '',
    zipcode: '',
    country: '',
    phoneNumber: ''
  })

  useEffect(() => {
    setState(JSON.parse(sessionStorage.getItem('kycDetails')))
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({ ...state,
      [name]: value
    }));
  }

  const handleAddressChange = address => {
    setState(state => ({ ...state,
      address: address
    }));
  };

  const handleSelect = address => {
    setState(state => ({ ...state,
      address: address
    }));
    console.log(address);
    geocodeByAddress(address)
      .then(results => {
        let raw = results[0].address_components;
        setState(state => ({ ...state,
          zipcode: raw[raw.length-1]['long_name'],
          country: raw[raw.length-2]['long_name'],
          state: raw[raw.length-3]['long_name'],
          city: raw[raw.length-4]['long_name']
        }));
      })
      .catch(error => console.error('Error', error));
  };

  const handleSave = () => {
    sessionStorage.setItem('kycDetails', JSON.stringify(state));
  }

  // const getISDCode = countryCode => {
  //   for(int i=0;i<countryCodes.length;i++){
  //
  //   }
  // }
  return (
      <React.Fragment>
          {/* <Typography variant="h6" gutterBottom>
              Company Details
      </Typography> */}
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <TextField
                      required
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      fullWidth
                      onChange={handleChange}
                      autoComplete="companyName"
                      value={state.companyName}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      onChange={handleChange}
                      autoComplete="fname"
                      value={state.firstName}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      onChange={handleChange}
                      autoComplete="lname"
                      value={state.lastName}
                  />
              </Grid>
              <Grid item xs={12} >
                  <TextField
                      required
                      id="flat"
                      name="flat"
                      label="Flat"
                      fullWidth
                      required
                      onChange={handleChange}
                      value={state.flat}
                  />
              </Grid>
              <Grid item xs={12}>
                <PlacesAutocomplete
                  value={state.address}
                  onChange={handleAddressChange}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <TextField
                          id="standard-search"
                          label="Address"
                          type="search"
                          fullWidth
                          margin="normal"
                          {...getInputProps()}
                        />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      onChange={handleChange}
                      value={state.city}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    onChange={handleChange}
                    value={state.state}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      fullWidth
                      onChange={handleChange}
                      value={state.zipcode}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="country"
                      name="country"
                      label="Country"
                      fullWidth
                      onChange={handleChange}
                      value={state.country}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      required
                      fullWidth
                      onChange={handleChange}
                      value={state.phoneNumber}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  className={classes.button}
              >
                  Save Details
              </Button>
              </Grid>

              {/* <Grid item xs={12}>
                  <FormControlLabel
                      control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                      label="I agree to the "
                  />
                  <FormControlLabel
                      control={<a></a>}
                      label={<a href="/help">terms of service.</a>}
                  />
              </Grid> */}
          </Grid>
      </React.Fragment>
  );
}

const steps = ['Company & Personal Details', 'KYC Documents', 'Terms of Service'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
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
                        {activeStep === steps.length ? (
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
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Accept' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
