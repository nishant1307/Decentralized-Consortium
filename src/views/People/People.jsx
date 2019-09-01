import React, {Suspense, useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import LocalOffer from "@material-ui/icons/LocalOffer";
import {Alert} from "reactstrap";
const ColleagueForm = React.lazy(() => import('views/ColleagueForm'))
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button";
import MaterialTable from "material-table";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {registryContract} from "registryContract";
import { connect } from 'react-redux';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from "components/CustomModal/Modal";
import LinearProgress from '@material-ui/core/LinearProgress';

const loading = <LinearProgress />;
const People = (props) => {

  const [allPeople, setPeople]=useState([]);
  const [colleagueForm, setColleagueForm] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // parseJSONFromIPFSHash(props.user.user[4]).then(userDetails => {
    //   setUserName(userDetails.info.fullName);
    // })
    registryContract.methods.getOrganizationEmployees().call({
      from : props.auth.user.publicKey
    }).then(res => {
      setPeople(res);
    })
  }, []);

  const toggleColleagueForm = () => {
    setColleagueForm(!colleagueForm);
  }

  const handleColleagueFormSubmit = (message) => {
    setAlert(<Alert>{message}</Alert>);
    setTimeout(
      function () {
        setAlert('');
      }
        .bind(this),
      3000
    );
  }

  const fetchRoleFromRoleCode =(roleCode) => {
    switch(roleCode){
      case "0": return "Regular"
      case "1": return "Admin"
      case "2": return "Registrant"
    }
  }

  const fetchAction = (roleCode) => {
    switch(roleCode){
      case "0": return <Button color="primary">Make Registrant</Button>
      case "1": return "No action"
      case "2": return <Button color="primary">Make Admin</Button>
    }
  }

  const {classes} = props;

  return (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Employees in your Organization
            </h4>
            {props.user.user[5]==="1" && <AddBoxIcon onClick={toggleColleagueForm}/>}
          </CardHeader>
          <MaterialTable
              columns={[
                { title: "Email", field: "email" },
                { title: "PublicKey", field: "publicKey" },
                { title: "Employee Role", field: "role" , render: rowData => fetchRoleFromRoleCode(rowData.role)},
                { title: "Action", field: "role" , render: rowData => fetchAction(rowData.role)}
              ]}
              data={allPeople}
              title=""
              options={{
                search: true,
                exportButton: true
              }}
          />
        </Card>
      </GridItem>
    </GridContainer>
    <Suspense fallback={loading}>
      <Modal
        open={colleagueForm}
        onClose={toggleColleagueForm}
        title={"New Colleague Form"}
        content= {
          <ColleagueForm onColleagueFormSubmit={handleColleagueFormSubmit} />
        }
      />
    </Suspense>
      {alert}
    </div>
  );
}

People.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(People));
