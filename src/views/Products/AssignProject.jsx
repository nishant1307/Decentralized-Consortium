import React, {useState} from "react";

import {registryContract} from "registryContract";

import {
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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
