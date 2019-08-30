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
import Icon from "@material-ui/core/Icon";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialTable from "material-table";
import Menu from '@material-ui/core/Menu';
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {registryContract} from 'registryContract';
import { connect } from 'react-redux';
const Partners = (props) => {
  const {classes} = props;

  const [partners, setPartners] = useState([]);
  const [loader, setLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
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
    setPartners([]);
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setLoader(true);
    registryContract.methods.getPartnersByType(options[selectedIndex]).call({
      from : props.auth.user.publicKey
    }).then(res => {
      setLoader(false)
      setPartners(res);
    })
  }, [selectedIndex]);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
        <Paper>
        <List component="nav" aria-label="Device settings">
            <ListItem
              button
              aria-haspopup="true"
              onClick={handleClickListItem}
            >
              <ListItemText primary="Select Organization Type" secondary={options[selectedIndex]} />
            </ListItem>
        </List>
        </Paper>
        <Menu
            id="partner-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={event => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
        </Menu>
        </GridItem>
        <Divider orientation="vertical"/>
        <GridItem xs={12} sm={12} md={6}>
          <Button color="primary">Enlist your organization as Partner</Button>
          <TextField/>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {!loader?
            partners.length>0 ?
            <Card plain>
              <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Partners in the selected category
              </h4>
              </CardHeader>
                <MaterialTable
                    columns={[
                      { title: "OrganizationID", field: "organizationID"},
                      { title: "Organization Name", field: "name"}

                    ]}
                    data={partners}
                    title=""
                    options={{
                      search: true,
                      exportButton: true
                    }}
                  />
            </Card>:
              "No organizations in the selected Category":
              <React.Fragment>
                <Card plain>
                  <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    Partners in the selected category
                  </h4>
                  </CardHeader>
                    <Skeleton width="100%"/>
                    <Skeleton width="60%" />
                    <Skeleton width="100%" />
                    <Skeleton width="60%" />
                    <Skeleton width="100%" />
                    <Skeleton width="60%" />
                    <Skeleton width="100%" />
                </Card>
              </React.Fragment>}
              </GridItem>
      </GridContainer>
    </>
  );
}

Partners.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Partners));
