import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Label, Input, FormText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { createNewProject, closeProjectModal } from '../actions/userActions';
import useForm from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import { industryList } from '../dataset/industries';
import { functionalRoles } from '../dataset/functionalRoles';
import { renderFromArray } from '../utils';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function ProjectFormModal(props) {
  const classes = useStyles();

  const initialState = {
    modal: false,
    functionalRoles: '',
    isLoading: false,
    isReadyForProject: true
  }

  const [state, setState] = useState(initialState);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, `Project name has to be at least 2 characters`)
      .required('Project name is required'),
    description: Yup.string()
      .min(2, `Description has to be at least 1 character`)
      .required('Description is required')
  })


  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    validationSchema: validationSchema,
  })



  const reset = () => {
    // this.setState(this.initialState);
    setState(initialState);
  }

  const toggle = () => {
    props.closeProjectModal();
    setState(initialState);
  }

  // useEffect(() => {
  //   axios.post("/api/dashboard/checkRegistration", {})
  //     .then(res => {
  //       if (res.data)
  //         setState(state => ({ ...state, isReadyForProject: res.data, isLoading: false }));
  //       else
  //         setState(state => ({ ...state, isReadyForProject: res.data, isLoading: true }));
  //     })
  //     .catch(err => {
  //       // console.log(err);
  //       setState(state => ({ ...state, isReadyForProject: false, isLoading: true }));
  //     })
  //
  // }, [])

  const { isReadyForProject } = state;
  let button;
  if (isLoading) {
    button = <CircularProgress className={classes.progress} />;
    ;
  }

  const submitProject = () => {
    // console.log({ name: projectName, description: projectDescription, industry: industry, partnerRole: role });
    props.createNewProject({ name: projectName, description: projectDescription, industry: industry, partnerRole: role });
    setLoading(true)
  }

  return (
    <div className="animated fadeIn">
      {!isReadyForProject &&
        <Modal isOpen={props.user.projectModalOpen} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}><strong>Please wait till your account gets registered on the Open Registry</strong></ModalHeader>
          <ModalFooter>
            {isLoading && <CircularProgress className={classes.progress} />}
          </ModalFooter>
        </Modal>
      }
      {isReadyForProject &&
        <Row>
          <Col>
            <Modal isOpen={props.user.projectModalOpen} toggle={toggle} className={props.className}>
              <Form className="form-horizontal">
                <ModalHeader toggle={toggle}><strong>New Project Form</strong></ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        label= "Project Name"
                        name="name"
                        required
                        onChange={(e => setProjectName(e.target.value))}
                      />
                      <FormText color="muted">Enter a name for your Project (For example: TestProject)</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        label="Project Description"
                        name="description"
                        required
                        onChange={(e => setProjectDescription(e.target.value))}
                      />
                      <FormText color="muted">Describe your project</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select Industry</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                        placeholder="industry"
                        name="industry"
                        required
                        value={industry}
                        onChange={(e)=> setIndustry(e.target.value)}
                      >
                        <option value="0">Please select</option>
                        {renderFromArray(industryList)}
                      </Input>
                      <FormText color="muted">What industry does your project cover?</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Select Role</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label check>
                        <Input type="radio" name="role" value={0} onChange={(e)=> setRole(e.target.value)}/>{' '}
                        Buyer
                    </Label><br />
                      <Label check>
                        <Input type="radio" name="role" value={1} onChange={(e)=> setRole(e.target.value)}/>{' '}
                        Seller
                      </Label>
                    </Col>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {isLoading && <CircularProgress className={classes.progress} /> }
                  {!isLoading && <Button color="primary" type="button" onClick={submitProject}>Create Project</Button>
                  }
                </ModalFooter>
              </Form>
              {props.errors.projectError && (<FormGroup>
                <Col md="12" className="center">

                  <Alert color="danger">
                    {props.errors.projectError.message}
                  </Alert>

                </Col>
              </FormGroup>)
              }
            </Modal>
          </Col>
        </Row>}
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewProject, closeProjectModal })(ProjectFormModal)
