import React, { useState, useEffect } from 'react';
import {Alert, Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Label, Input, FormText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from "axios";

import { connect } from 'react-redux';
import { createNewProject, closeProjectModal } from '../actions/userActions';
import useForm from 'react-hook-form'

import * as Yup from 'yup';
import { industryList } from '../dataset/industries';
import { functionalRoles } from '../dataset/functionalRoles';
import { renderFromArray } from '../utils';

function ProjectFormModal(props) {

  const initialState = {
    modal: false,
    industry: '',
    subIndustry: '',
    isLoading: false,
    isReadyForProject: true
  }

  const [state, setState] = useState(initialState);

  const validationSchema =  Yup.object().shape({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }

  const onSubmitForm = (data, e) => {
    e.preventDefault();
    setState(state => ({
      ...state,
      isLoading: true
    }));
    const { name, description } = data;
    props.createNewProject({ name: name, description: description, industry: state.industry, subIndustry: state.subIndustry, tokenName: name, tokenSymbol: name, organizationName: props.user.organization.organizationName });
  }

  useEffect(() => {
    axios.post("/api/dashboard/checkRegistration", {})
      .then(res => {
        if (res.data)
          setState(state => ({ ...state, isReadyForProject: res.data, isLoading: false }));
        else
          setState(state => ({ ...state, isReadyForProject: res.data, isLoading: true }));
      })
      .catch(err => {
        // console.log(err);
        setState(state => ({ ...state, isReadyForProject: false, isLoading: true }));
      })

  }, [])

  const { isLoading, isReadyForProject } = state;
  let button;
  if (isLoading) {
    button = <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>;
  }

  return (
    <div className="animated fadeIn">
      {!isReadyForProject &&
        <Modal isOpen={props.user.projectModalOpen} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}><strong>Please wait till your account gets registered on the Open Registry</strong></ModalHeader>
          <ModalFooter>
            {isLoading && <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>}
          </ModalFooter>
        </Modal>
      }
      {isReadyForProject &&
        <Row>
          <Col>
            <Modal isOpen={props.user.projectModalOpen} toggle={toggle} className={props.className}>
              <Form  onSubmit={handleSubmit(onSubmitForm)} className="form-horizontal">
                <ModalHeader toggle={toggle}><strong>New Project Form</strong></ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Project Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"
                        placeholder="Project Name"
                        name="name"
                        valid={!errors.name}
                        invalid={errors.name}
                        required
                        innerRef={register}
                        />
                      <FormFeedback>{errors.name}</FormFeedback>
                      <FormText color="muted">Enter a name for your Project (For example: TestProject)</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Project Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"
                        placeholder="Description"
                        name="description"
                        valid={!errors.description}
                        invalid={errors.description}
                        required
                        innerRef={register}
                        />
                      <FormFeedback>{errors.description}</FormFeedback>
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
                        valid={!errors.industry}
                        invalid={errors.industry}
                        required
                        value={state.industry}
                        onChange={handleChange}
                        >
                        <option value="0">Please select</option>
                        {renderFromArray(industryList)}
                      </Input>
                      <FormFeedback>{errors.industry}</FormFeedback>
                      <FormText color="muted">What industry does your project cover?</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Functional Roles</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                        placeholder="Functional Roles"
                        name="subIndustry"
                        valid={!errors.subIndustry}
                        invalid={errors.subIndustry}
                        required
                        value={state.subIndustry}
                        onChange={handleChange}
                       >
                        <option value="0">Please select</option>
                        {renderFromArray(functionalRoles)}
                      </Input>
                      <FormFeedback>{errors.subIndustry}</FormFeedback>
                      <FormText color="muted">What functional role does your project cover?</FormText>
                    </Col>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {isLoading && <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                  </div>}
                  {!isLoading && <Button color="primary" disabled={false} >Create Project</Button>
                  }
                </ModalFooter>
              </Form>
              {props.errors.projectError && (<FormGroup>
                    <Col md="12" className="center">

              <Alert color="danger">
                {props.errors.projectError.message}
              </Alert>

          </Col>
              </FormGroup>  )
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
