import React, { useState, useEffect } from 'react';
import axios from "axios";
import { createNewDevice, closeDeviceModal } from 'actions/userActions';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'
import { deviceList, protocolList, sensorList, dataProtocolList } from 'dataset/devices';
import { renderFromArray } from 'utils';
import Modal from "components/CustomModal/Modal";
import Snackbar from '../components/Snackbar/Snackbar.jsx'
import {
  TextField,
  CircularProgress,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormGroup,
  FormControl,
  Button
} from '@material-ui/core';
import GridItem from "components/Grid/GridItem";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from './validator';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: 500,
  },
  csvInput: {
    padding: "10px",
    display: "block",
    margin: "15px auto",
    border: "1px solid #ccc",
    borderRadius: "5px"
  }
}));


const RegisterDeviceModal = (props) => {
  const classes = useStyles();
  const [deviceURN, setDeviceURN] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
  let selectedProject = "";
  selectedProject = props.selectedProject;
  const initialState = {
    // selectedProject: '',
    deviceType: '',
    sensor: '',
    communicationProtocol: '',
    dataProtocol: '',
    number: 1
  }
  const [state, setState] = useState(initialState);

  const { values, useInput, isValid } = useForm(initialState);


  useEffect(() => {
    if (props.errors.message !== undefined) {
      setSnackbar({ open: true, message: "Network error Occured! Please try again later." });
      setTimeout(() => {
        setSnackbar({ open: false, message: "" });
      }, 10000)
      props.closeDeviceModal();
      setLoading(false)
    }
  }, [props.errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let deviceURNArray = Array.isArray(deviceURN) ? deviceURN : [deviceURN]
    props.createNewDevice({
      deviceURN: deviceURNArray,
      communicationProtocol: values.communicationProtocol,
      selectedProject: selectedProject,
      dataProtocol: values.dataProtocol,
      deviceType: values.deviceType,
      sensor: values.sensor,
      tokenURI: "",
      number: deviceURNArray.length,
      projectId: props.projectId
    });
  };

  const toggle = () => {
    setState(initialState);
    setLoading(false);
    setDeviceURN('');
    props.closeDeviceModal();
  }

  const handleFileLoaded = data => {
    let deviceURNs = []
    data.map((deviceURN, i) => {
      if (deviceURN[0] !== 'DeviceURN' && deviceURN[0] !== '') { deviceURNs.push(deviceURN[0]) }
    })
    setDeviceURN(deviceURNs)
    setState({ number: deviceURNs.length })
  }

  const handleError = error => {
    // console.log(error)
  }

  return (
    <div className="animated fadeIn">
      <Modal
        open={props.user.deviceModalOpen}
        onClose={toggle}
        title="New Device Registration "
        content={
          <>
            <FormGroup row>
              <GridItem xs="12" md="9">
                <TextField
                  type="number"
                  name="number"
                  fullWidth
                  variant="outlined"
                  // value={state.number}
                  // onChange={handleChange}
                  {...useInput('number', 'isRequired')}
                  label="Number of Devices" />
                <FormHelperText color="muted">How many devices do you wish to register?</FormHelperText>
              </GridItem>
            </FormGroup>
            <FormGroup row>
              <GridItem xs="12" md="6">
                {values.number == 1 ?
                  <React.Fragment>
                    <TextField type="text"
                      name="deviceURN"
                      fullWidth
                      variant="outlined"
                      value={deviceURN}
                      onChange={(e) => { setDeviceURN(e.target.value) }}
                      label="DeviceURN" />
                    <FormHelperText color="muted">Enter Device URN</FormHelperText>
                  </React.Fragment> :
                  <CSVReader
                    cssClass={classes.csvInput}
                    label="Select CSV with deviceURN field "
                    onFileLoaded={handleFileLoaded}
                    onError={handleError}
                    inputId="ObiWan"
                    inputStyle={{ color: 'black' }}
                  />
                }
              </GridItem>
            </FormGroup>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="industryList">Select Device Type</InputLabel>
              <Select
                name="deviceType"
                // value={state.deviceType}
                required
                labelWidth={150}
                input={<OutlinedInput />}
                // onChange={handleChange}
                {...useInput('deviceType', 'isRequired')}
              >
                {renderFromArray(deviceList)}
              </Select>
            </FormControl><br />
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="industryList">Select Sensor</InputLabel>
              <Select
                name="sensor"
                // value={state.sensor}
                required
                labelWidth={100}
                input={<OutlinedInput />}
                // onChange={handleChange}
                {...useInput('sensor', 'isRequired')}
              >
                {renderFromArray(sensorList)}
              </Select>
              <FormHelperText color="muted">Enter the sensor your device is using</FormHelperText>
            </FormControl><br />
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="industryList">Select Communication Protocol</InputLabel>
              <Select
                name="communicationProtocol"
                // value={state.communicationProtocol}
                required
                labelWidth={230}
                input={<OutlinedInput />}
                // onChange={handleChange}
                {...useInput('communicationProtocol', 'isRequired')}

              >
                {renderFromArray(protocolList)}
              </Select>
            </FormControl><br />
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="industryList">Select Data Protocol</InputLabel>
              <Select
                name="dataProtocol"
                // value={state.dataProtocol}
                required
                labelWidth={150}
                input={<OutlinedInput />}
                // onChange={handleChange}
                {...useInput('dataProtocol', 'isRequired')}
              >
                {renderFromArray(dataProtocolList)}
              </Select>
            </FormControl>
          </>
        }

        action={
          <div>
            {isLoading === true ? <CircularProgress className={classes.progress} /> :

              <Button disabled={!isValid} color="primary" type="button" onClick={onSubmit}>Register new device</Button>
            }
            {props.errors.deviceError && (
              <FormGroup>
                <GridItem md="12" className="center">

                  <SnackbarContent
                    color="danger"
                    message={props.errors.deviceError.message}
                  />

                </GridItem>
              </FormGroup>)
            }
          </div>
        }
      />
      <Snackbar color="danger" open={snackbar.open} place="bl" className={classes.margin} message={snackbar.message} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewDevice, closeDeviceModal })(RegisterDeviceModal);
