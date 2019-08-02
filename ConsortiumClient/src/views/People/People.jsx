import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
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
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import web3 from '../../web3';
import {registryABI, registryAddress} from '../../utils';
const registryContract = new web3.eth.Contract(registryABI, registryAddress);

const People = (props) => {

  const [allPeople, setPeople] = useState([]);
  const [colleagueForm, setColleagueForm] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    registryContract.methods.getAllUsers().call({
      from : "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
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
  let peopleRender = [];
  allPeople.forEach(people => {
    peopleRender.push(
      <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/people/1">
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{people.firstName} {people.lastName}</p>
            <h4 className={classes.cardTitle}></h4>
          </CardHeader>
          <CardBody>
            {people.email}
          </CardBody>
          <CardFooter stats>
            <div className={classes.stats}>
              <LocalOffer />
              Add to a consortium
            </div>
          </CardFooter>
        </Card>
        </Link>
      </GridItem>
    )
  })

  return (
    <div>
      <GridContainer>
        {peopleRender}
        <GridItem xs={12} sm={6} md={3}>
          <Card onClick={renderColleagueForm}>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle} >Invite a colleague</h4>
            </CardHeader>
          </Card>
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

export default withStyles(dashboardStyle)(People);
