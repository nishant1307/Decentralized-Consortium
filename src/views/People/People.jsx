import React, {useState, useEffect} from "react";
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
import ColleagueForm from "views/ColleagueForm";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import MaterialTable from "material-table";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {registryContract} from "registryContract";
import { connect } from 'react-redux';

const People = (props) => {

  const [allPeople, setPeople] = useState([]);
  const [colleagueForm, setColleagueForm] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    registryContract.methods.getOrganizationEmployees().call({
      from : props.auth.user.publicKey
    }).then(res => {
      setPeople(res);
    })
  }, []);

  const renderColleagueForm = () => {
    setColleagueForm(true);
  }

  const hanldeColleagueFormSubmit = (message) => {
    setAlert(<Alert>{message}</Alert>);
    setTimeout(
      function () {
        setAlert('');
      }
        .bind(this),
      3000
    );
  }

  const {classes} = props;

  return (
    <div>
    <MaterialTable
        columns={[
          { title: "Email", field: "email" },
          { title: "PublicKey", field: "publicKey" }
        ]}
        data={allPeople}
        title="Employees in your Organization"
        options={{
          search: true,
          exportButton: true
        }}
      />

      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          {props.user.user[5]==="1" && <Card onClick={renderColleagueForm}>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle} >Invite a colleague</h4>
            </CardHeader>
          </Card>}
        </GridItem>
      </GridContainer>
      {alert}
      {colleagueForm && <ColleagueForm onColleagueFormSubmit={hanldeColleagueFormSubmit} />}
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
