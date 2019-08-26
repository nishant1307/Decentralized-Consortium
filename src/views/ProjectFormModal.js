import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Label, Input, FormText, Col,  Row } from 'reactstrap';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { createNewProject, closeProjectModal } from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "components/CustomModal/Modal";
import { industryList } from '../dataset/industries';
import { functionalRoles } from '../dataset/functionalRoles';
import { renderFromArray } from '../utils';
import 'bootstrap/dist/css/bootstrap.min.css';
const bip39 = require('bip39')
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function ProjectFormModal(props) {
  const classes = useStyles();

  const initialState = {
    isReadyForProject: true
  }

  const [state, setState] = useState(initialState);
  const [projectName, setProjectName] = useState('');
  const [projectPasscode, setPasscode] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const toggle = () => {
    setProjectName('');
    setProjectDescription('');
    setProjectDescription('');
    setIndustry('');
    setRole(0);
    setLoading(false);
    props.closeProjectModal();
  }

  useEffect(() => {
    // axios.post("/api/dashboard/checkRegistration", {})
    //   .then(res => {
    //     if (res.data)
    //       setState(state => ({ ...state, isReadyForProject: res.data, isLoading: false }));
    //     else
    //       setState(state => ({ ...state, isReadyForProject: res.data, isLoading: true }));
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     setState(state => ({ ...state, isReadyForProject: false, isLoading: true }));
    //   })
    setPasscode(bip39.generateMnemonic().split(' ')[0]);

  }, [props.user.projectModalOpen])

  const { isReadyForProject } = state;
  let button;
  if (isLoading) {
    button = <CircularProgress className={classes.progress} />;
    ;
  }

  const submitProject = () => {
    // console.log({ name: projectName, description: projectDescription, industry: industry, partnerRole: role });
    props.createNewProject({ name: projectName, description: projectDescription, industry: industry, partnerRole: role, passcode: projectPasscode });
    setLoading(true)
  }

  return (
    <div className="animated fadeIn">
      {!isReadyForProject &&
        <Modal
          open={props.user.projectModalOpen}
          onClose={toggle} className={props.className}
          title={"Please wait till your account gets registered on the Open Registry"}
          action={isLoading && <CircularProgress className={classes.progress} />}
          />
      }
      {isReadyForProject &&
        <Row>
          <Col>
            <Modal
            open={props.user.projectModalOpen}
            onClose={toggle}
            title={"New Project Form"}
            content= {
              <Form className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        variant="outlined"
                        label= "Project Name"
                        name="name"
                        required
                        value={projectName}
                        onChange={(e => setProjectName(e.target.value))}
                      />
                      <FormText color="muted">Enter a name for your Project (For example: TestProject)</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        variant="outlined"
                        label="Project Description"
                        name="description"
                        required
                        value={projectDescription}
                        onChange={(e => setProjectDescription(e.target.value))}
                      />
                      <FormText color="muted">Describe your project</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Select Industry
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
                      Select Role
                    </Col>
                    <Col xs="12" md="9">

                        <Input type="radio" name="role" value={1} onChange={(e)=> setRole(e.target.value)}/>{' '}
                        Buyer
                    <br />
                        <Input type="radio" name="role" value={2} onChange={(e)=> setRole(e.target.value)}/>{' '}
                        Seller
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        disabled
                        variant="outlined"
                        label="Autogenerated passcode"
                        name="description"
                        required
                        value={projectPasscode}
                      /><br/>
                      Your invitees can join this project using this passcode.
                    </Col>
                  </FormGroup>
              </Form>

            }
            action={
              <div>
                {!isLoading? <Button color="primary" type="button" onClick={submitProject}>Create Project</Button> : <CircularProgress className={classes.progress} />}
                {props.errors.projectError && (<FormGroup>
                  <Col md="12" className="center">

                    <Alert color="danger">
                      {props.errors.projectError.message}
                    </Alert>

                  </Col>
                </FormGroup>)
                }
              </div>
            }
            />
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
