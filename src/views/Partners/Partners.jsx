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
import Menu from '@material-ui/core/Menu';
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomLoader from 'components/Loaders/CustomLoader';
import Divider from '@material-ui/core/Divider';
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
  'All',
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

  let partnerRender = [];
  partners.forEach(partner => {
    partnerRender.push(
      <GridItem key={Math.random()} xs={12} sm={6} md={3}>
        <Link to= {"/"}>
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory} style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
              {partner[1]}
            </p>
            <h3 className={classes.cardTitle} style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
              {partner[0]}
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
            <Icon>apps</Icon>
              Click on Organization to see all employees
            </div>
          </CardFooter>
        </Card>
        </Link>
      </GridItem>
    )
  })

  return (
    <div>
      <Divider/>
      <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Organization Type"
            onClick={handleClickListItem}
          >
            <ListItemText primary="Organization Type" secondary={options[selectedIndex]} />
          </ListItem>
      </List>
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
      <Divider/>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        {!loader?
          partners.length>0 ?
          partnerRender:
            "No organizations in the selected Category":
        <CustomLoader/>}
        </GridItem>
      </GridContainer>
    </div>
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
