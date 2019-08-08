import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row  } from 'reactstrap';
import { Alert, CardFooter, Container, FormFeedback, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from "axios";
import { createNewDevice, closeDeviceModal } from 'actions/userActions';
import { connect } from 'react-redux';
import useForm from 'react-hook-form'
import * as Yup from 'yup';
import CSVReader from 'react-csv-reader'
import {deviceList, protocolList, sensorList, dataProtocolList} from 'dataset/devices';
import {renderFromArray} from 'utils';

const RegisterDeviceModal = (props) => {
  const [deviceURN, setDeviceURN] = useState('');
    const [state, setState] = useState({
      selectedProject: '',
      deviceType: '',
      sensor: '',
      communicationProtocol: '',
      dataProtocol: ''
    });
  const validationSchema = Yup.object().shape({
    number: Yup.number()
      .moreThan(0, "Minimum should be one")
      .required('required')
  })

  const { register, handleSubmit, isSubmitting, errors } = useForm({
    mode: 'onChange',
    validationSchema: validationSchema,
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }

  const onSubmit = (data, e) => {
    data.deviceURN= Array.isArray(deviceURN)? deviceURN : [deviceURN]
    data.tokenURI =  {
      communicationProtocol: state.communicationProtocol,
      dataProtocol: state.dataProtocol,
      deviceType: state.deviceType,
      sensor: state.sensor
    }
    data.selectedProject = state.selectedProject;

    console.log(data);
    props.createNewDevice(data);
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
  }

  const handleDarkSideForce = error => {
    console.log(error)
  }

  return (
    <div className="animated fadeIn">
        <Row>
          <Col>
          <Modal style={{maxWidth: '800px'}} isOpen={props.user.deviceModalOpen} toggle={toggle} className={props.className}>
            <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
              <ModalHeader toggle={toggle}><strong>New Device Registration </strong></ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select"
                      name="selectedProject"
                      valid={!errors.selectedProject}
                      invalid={errors.selectedProject}
                      autoFocus={true}
                      value={state.selectedProject}
                      onChange={handleChange}>
                      <option key="" name="" value="">Select Project</option>
                      {renderFromArray(props.projectList)}
                    </Input>
                    <FormFeedback>{errors.selectedProject}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Number of devices</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number"
                      name="number"
                      placeholder="Number of Devices"
                      valid={!errors.number}
                      invalid={errors.number}
                      innerRef={register}  />
                    <FormFeedback>{errors.number}</FormFeedback>
                    <FormText color="muted">How many devices do you wish to register?</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Device URN</Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Input type="text"
                      name="deviceURN"
                      onChange={(e) => {setDeviceURN(e.target.value)}}
                      placeholder="Text"  />
                    <FormFeedback>{errors.deviceURN}</FormFeedback>
                    <FormText color="muted">Enter Device URN</FormText>
                  </Col>
                  <Col xs="12" md="3">
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
                    valid={!errors.deviceType}
                    invalid={errors.deviceType}
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
                      valid={!errors.sensor}
                      invalid={errors.sensor}
                      value={state.sensor}
                      onChange={handleChange} >
                      {renderFromArray(sensorList)}
                      </Input>
                    <FormFeedback>{errors.sensor}</FormFeedback>
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
                      onChange={handleChange}
                      valid={!errors.communicationProtocol}
                      invalid={errors.communicationProtocol}>
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
                    onChange={handleChange}
                    valid={!errors.dataProtocol}
                    invalid={errors.dataProtocol}>
                      {renderFromArray(dataProtocolList)}
                    </Input>
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" innerRef={register} type="submit">Register new device</Button>
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
