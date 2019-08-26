import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText, Col,  ModalBody, ModalFooter, ModalHeader, Row  } from 'reactstrap';
import { Alert, CardFooter, Container, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from "axios";
import { createNewDevice, closeDeviceModal } from 'actions/userActions';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'
import {deviceList, protocolList, sensorList, dataProtocolList} from 'dataset/devices';
import {renderFromArray} from 'utils';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from "components/CustomModal/Modal";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));


const RegisterDeviceModal = (props) => {
  const classes = useStyles();
  const [deviceURN, setDeviceURN] = useState('');
  const [isLoading, setLoading] = useState(false);
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
    let deviceURNArray = Array.isArray(deviceURN)? deviceURN : [deviceURN]
    props.createNewDevice({
      deviceURN: deviceURNArray,
      communicationProtocol: state.communicationProtocol,
      selectedProject: selectedProject,
      dataProtocol: state.dataProtocol,
      deviceType: state.deviceType,
      sensor: state.sensor,
      tokenURI: "",
      number: deviceURNArray.length
    });
  };

  const toggle = () => {
    setState(initialState);
    setLoading(false);
    setDeviceURN('');
    props.closeDeviceModal();
  }

  const handleForce = data => {
    let deviceURNs = []
    data.map((deviceURN, i) => {
      if (deviceURN[0] !== 'DeviceURN' && deviceURN[0] !== '') { deviceURNs.push(deviceURN[0]) }
    })
    setDeviceURN(deviceURNs)
    setState({number:deviceURNs.length})
  }

  const handleDarkSideForce = error => {
    console.log(error)
  }

  return (
    <div className="animated fadeIn">
          <Modal
            open={props.user.deviceModalOpen}
            onClose={toggle}
            title="New Device Registration "
            content={
              <Form className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField
                        type="number"
                        name="number"
                        fullWidth
                        variant="outlined"
                        value={state.number}
                        onChange={handleChange}
                        label="Number of Devices"/>
                      <FormText color="muted">How many devices do you wish to register?</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="6">
                      <TextField type="text"
                        name="deviceURN"
                        fullWidth
                        variant="outlined"
                        value={deviceURN}
                        onChange={(e) => {setDeviceURN(e.target.value)}}
                        label="DeviceURN"  />
                      <FormText color="muted">Enter Device URN</FormText>
                    </Col>
                    <Col xs="12" md="6">
                      <CSVReader
                        cssClass="csv-reader-input"
                        label="Select CSV with deviceURN field "
                        onFileLoaded={handleForce}
                        onError={handleDarkSideForce}
                        inputId="ObiWan"
                        inputStyle={{ color: 'black' }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select Device Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                      name="deviceType"
                      value={state.deviceType}
                      onChange={handleChange}
                      id="select">
                        {renderFromArray(deviceList)}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Select Sensor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {/* <Input type="text" name="sensor" value={values.sensor} onChange={handleChange} id="text-input" placeholder="Text" /> */}
                      <Input type="select"
                        name="sensor"
                        value={state.sensor}
                        onChange={handleChange} >
                        {renderFromArray(sensorList)}
                        </Input>
                      <FormText color="muted">Enter the sensor your device is using</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select Communication Protocol</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                        name="communicationProtocol"
                        value={state.communicationProtocol}
                        onChange={handleChange}>
                        {renderFromArray(protocolList)}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select Data Protocol</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                      name="dataProtocol"
                      value={state.dataProtocol}
                      onChange={handleChange}>
                        {renderFromArray(dataProtocolList)}
                      </Input>
                    </Col>
                  </FormGroup>
              </Form>
            }

            action={
              <div>
                {isLoading === true  ? <CircularProgress className={classes.progress} /> :

                <Button color="primary" type="button" onClick={onSubmit}>Register new device</Button>
                }
                {props.errors.deviceError && (
                  <FormGroup>
                      <Col md="12" className="center">

                        <Alert color="danger">
                          {props.errors.deviceError.message}
                        </Alert>

                        </Col>
                </FormGroup>  )
                }
              </div>
            }
              />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewDevice, closeDeviceModal })(RegisterDeviceModal);
