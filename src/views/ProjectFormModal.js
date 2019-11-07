import React, { useState, useEffect } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { createNewProject, closeProjectModal } from '../actions/userActions';
import Modal from "components/CustomModal/Modal";
import { industryList } from '../dataset/industries';
import { functionalRoles } from '../dataset/functionalRoles';
import { renderFromArray } from '../utils';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Button,
  TextField,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel
} from '@material-ui/core';
import GridItem from "components/Grid/GridItem";
import CustomLoader from "components/Loaders/CustomLoader";
import { makeStyles } from '@material-ui/core/styles';
import { artRoles, certification, shipping } from "dataset/projectRoles";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  formControl: {
    margin: theme.spacing(3),
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
  const [role, setRole] = useState('');
  const [isLoading, setLoading] = useState(false);

  const toggle = () => {
    setProjectName('');
    setProjectDescription('');
    setProjectDescription('');
    setIndustry('');
    setRole(1);
    setLoading(false);
    props.closeProjectModal();
  }

  const { isReadyForProject } = state;
  const submitProject = () => {
    // console.log({ name: projectName, description: projectDescription, industry: industry, partnerRole: role });
    props.createNewProject({ name: projectName, description: projectDescription, industry: industry, partnerRole: role, passcode: projectPasscode });
    setLoading(true)
  }

  return (
    <div className="animated fadeIn">
      {isReadyForProject &&
        <GridItem>
          <Modal
            open={props.user.projectModalOpen}
            onClose={toggle}
            title={"New Project Form"}
            content={
              <>
                <FormGroup row>
                  <GridItem xs="12" md="6">
                    <TextField type="text"
                      variant="outlined"
                      label="Project Name"
                      name="name"
                      fullWidth
                      required
                      value={projectName}
                      onChange={(e => setProjectName(e.target.value))}
                    />
                    <FormHelperText color="muted">Enter a name for your Project (For example: TestProject)</FormHelperText><br />
                  </GridItem>
                  <GridItem xs="12" md="6">
                    <TextField type="text"
                      variant="outlined"
                      label="Project Description"
                      name="description"
                      required
                      fullWidth
                      multiline
                      rows="4"
                      value={projectDescription}
                      onChange={(e => setProjectDescription(e.target.value))}
                    />
                    <FormHelperText color="muted">Describe your project</FormHelperText>
                  </GridItem>
                </FormGroup><br />
                <FormGroup row>
                  <GridItem xs="12" md="6">
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="industryList">Select Industry</InputLabel>
                      <Select
                        name="industry"
                        required
                        fullWidth
                        labelWidth={110}
                        input={<OutlinedInput name="industry" id="indList" />}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        {renderFromArray(industryList)}
                      </Select>
                      <FormHelperText color="muted">What industry does your project cover?</FormHelperText>
                    </FormControl>
                  </GridItem>
                  <GridItem xs="12" md="6">
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="industryList">Select Role</InputLabel>
                      <Select
                        name="role"
                        required
                        fullWidth
                        labelWidth={80}
                        input={<OutlinedInput name="role" id="indList" />}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {industry ==="Art & Collectibles" && renderFromArray(artRoles)}
                        {industry ==="Certification" && renderFromArray(certification)}
                        {industry ==="Shipping" && renderFromArray(shipping)}
                      </Select>
                      <FormHelperText color="muted">Select your role for project?</FormHelperText>
                    </FormControl>
                  </GridItem>
                </FormGroup>
              </>

            }
            action={
              <>
                {!isLoading ? <Button color="primary" type="button" onClick={submitProject}>Create Project</Button> : <CustomLoader />}
              </>
            }
            {...props}
          />

        </GridItem>}
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewProject, closeProjectModal })(ProjectFormModal)
