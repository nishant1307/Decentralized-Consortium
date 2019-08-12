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
import CustomLoader from 'components/Loaders/CustomLoader';
import {connect} from "react-redux";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {registryContract} from 'registryContract';

const ProjectPartners = (props) => {

  const [partners, setPartners] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
    const [loader, setLoader] = useState(true);

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
    registryContract.methods.getConsortiumMember(props.match.params.projectID).call({
      from : props.auth.user.publicKey
    }).then(res => {
      setLoader(false)
      setPartners(res);
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
            {!loader?
              partners.length>0 ?
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Public Key", "OrganizationID", "Email", "KYC Status", "User KYC Hash", "User Role"]}
                    tableData={partners}
                  />
                </CardBody>:
                "No partners in the selected Category":
            <CustomLoader/>}
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
