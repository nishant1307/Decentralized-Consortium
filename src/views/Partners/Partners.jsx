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

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import web3 from '../../web3';
import {registryABI, registryAddress} from '../../utils';
const registryContract = new web3.eth.Contract(registryABI, registryAddress);

const Partners = (props) => {

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
    registryContract.methods.getPartnersByType("regular").call({
      from : "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
    }).then(res => {
      setPartners(res);
    })
  }, []);

  const {classes} = props;

  return (
    <div>
      <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Partner Type"
            onClick={handleClickListItem}
          >
            <ListItemText primary="Partner Type" secondary={options[selectedIndex]} />
          </ListItem>
      </List>
      <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
      </Menu>
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

Partners.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Partners);
