import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row  } from 'reactstrap';
import { Alert, CardFooter, Container, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from "axios";
import { createNewDevice, closeDeviceModal } from 'actions/userActions';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'
import {deviceList, protocolList, sensorList, dataProtocolList} from 'dataset/devices';
import {renderFromArray} from 'utils';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    const [state, setState] = useState({
      // selectedProject: '',
      deviceType: '',
      sensor: '',
      communicationProtocol: '',
      dataProtocol: '',
      number: 1
    });

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
    let tokenURI =  {
      communicationProtocol: state.communicationProtocol,
      dataProtocol: state.dataProtocol,
      deviceType: state.deviceType,
      sensor: state.sensor
    }
    props.createNewDevice({
      selectedProject: props.projectList[0],
      deviceURN: deviceURNArray,
      tokenURI: tokenURI,
      number: deviceURNArray.length
    });
  };

  const toggle = () => {
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
        <Row>
          <Col>
          <Modal style={{maxWidth: '800px'}} isOpen={props.user.deviceModalOpen} toggle={toggle} className={props.className}>
            <Form className="form-horizontal">
              <ModalHeader toggle={toggle}><strong>New Device Registration </strong></ModalHeader>
              <ModalBody>
              {/*  <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select"
                      name="selectedProject"
                      autoFocus={true}
                      value={props.projectList[0]}
                      onChange={handleChange}>
                      {renderFromArray(props.projectList)}
                    </Input>
                  </Col>
                </FormGroup> */}
                <FormGroup row>
                  <Col xs="12" md="9">
                    <TextField
                      type="number"
                      name="number"
                      fullWidth
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
              </ModalBody>
              <ModalFooter>
                {isLoading === true  ? <CircularProgress className={classes.progress} /> :

                <Button color="primary" type="button" onClick={onSubmit}>Register new device</Button>
                }
              </ModalFooter>
            </Form>
              {props.errors.deviceError && (<FormGroup>
                    <Col md="12" className="center">

              <Alert color="danger">
                {props.errors.deviceError.message}
              </Alert>

          </Col>
              </FormGroup>  )
              }
          </Modal>
          </Col>
        </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewDevice, closeDeviceModal })(RegisterDeviceModal);
