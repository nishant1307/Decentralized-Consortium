import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {connect} from "react-redux";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import web3 from '../../web3.js';
import {registryABI, registryAddress} from 'utils';
const registryContract = new web3.eth.Contract(registryABI, registryAddress);

const ProjectPartners = (props) => {

  const [partners, setPartners] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const options = [
  'Regular',
  'Financial Institution',
  'Certification Agency',
  'Government',
  'Business',
  'Logistics',
  'Distributor',
  'Retailer',
  'Recycler'
];


  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    registryContract.methods.getConsortiumMember("40a6e060-b76c-11e9-a17c-b745382b2f90").call({
      from : "0x66911a74374df86b19317f9c7f515fc18c5347c2"
    }).then(res => {
      // setPartners(res);
      console.log("response if ", res);
    })
  }, []);

  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Regular Partners
              </h4>
              <p className={classes.cardCategoryWhite}>
                Select Partner to add to Consortium
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "City", "Country", "Zipcode"]}
                tableData={partners}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ProjectPartners.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(ProjectPartners));
