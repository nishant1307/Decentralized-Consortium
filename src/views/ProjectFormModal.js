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

const bip39 = require('bip39')
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

const roleCategory = [
  "Select Role",
  "Agent",
  "Bank",
  "Brand",
  "Buyer",
  "Certification Agency",
  "Consumer",
  "Customs / Authorities",
  "Distributor",
  "Environmental Health & Safety",
  "Facility Maintenance",
  "Field Services",
  "Government",
  "Hardware Integrator",
  "Human Resources",
  "Infrastructure",
  "Insurance",
  "Logistics",
  "Logistics - 3PL",
  "Logistics - Intermodal",
  "Logistics - Ocean Carriers",
  "Maintenance",
  "Marketing",
  "Material Supplier",
  "Municipal / Local Body",
  "Ports / Terminals",
  "Power / Energy",
  "Procurement & Sourcing",
  "Product Development",
  "Production - Manufacturing",
  "Production - Natural Resources",
  "Quality Assurance",
  "Real Estate / Property Management",
  "Recycling",
  "Research & Development",
  "Seller",
  "Software Integrator",
  "Telecom",
  "Traffic Management",
  "Transportation",
  "Utility",
  "Warehouse Management",
  "Warehousing",
  "Waste Management"
]

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
                    <TextField type="text"

                      variant="outlined"
                      label="Autogenerated passcode"
                      name="description"
                      required
                      fullWidth
                      value={projectPasscode}
                    /><br />
                    <FormHelperText color="muted">Your invitees can join this project using this passcode.</FormHelperText>
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
                        name="industry"
                        required
                        fullWidth
                        labelWidth={80}
                        input={<OutlinedInput name="role" id="indList" />}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {renderFromArray(roleCategory)}
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
