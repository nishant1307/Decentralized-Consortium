import React, {useState} from "react";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import {registryContract} from "registryContract";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 500,
  },
}));

const AssignProject = (props) => {
  const classes = useStyles();
  const [projectList, setProjectList] = useState([]);
  const [projectListRender, setProjectListRender] = useState([]);
  React.useEffect(()=> {
    registryContract.methods.getMyProjects().call({
      from: props.userPublicKey
    }).then(res => {
      console.log(res);
      res.forEach(project => {
        setProjectListRender(projectListRender => [
          ...projectListRender,
          <MenuItem key={Math.random()}  name={project.name} value={project.projectID}>{project.name} | {project.description}</MenuItem>
        ]);
      })
      setProjectList(res);
    });
  },[])

  return(
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel htmlFor="industryList">Select Project Name</InputLabel>
      <Select
      value={props.selectedProject}
        required
        input={<OutlinedInput />}
        onChange={props.onSelectProject}
      >
        {projectListRender}
      </Select>
    </FormControl>
  )
}

export default AssignProject;
