import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from "material-table";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import CustomTabs from "components/CustomTabs/CustomTabs";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {registryContract} from 'registryContract';
import { connect } from 'react-redux';

import {
  Icon,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  TextField,
  Divider,
  Paper,
  Chip
} from '@material-ui/core';
import {DropzoneDialog, DropzoneArea} from 'material-ui-dropzone'
import {withStyles} from '@material-ui/core/styles';

const Partners = (props) => {
  const {classes} = props;

  const [partners, setPartners] = useState([]);
  const [loader, setLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropzone, setDropzone] = useState(false);
  const [, forceUpdate] = useState();
  const [selectedCategoryIndices, setSelectedCategoryIndices] = useState([]);

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
function handleDelete(category) {
    // console.log(selectedCategoryIndices);
    // console.log(category, "to be removed");
    let selectedArray = selectedCategoryIndices;
    if(selectedCategoryIndices.indexOf(category)!=-1){
      selectedArray.splice(selectedCategoryIndices.indexOf(category), 1);
    }
    setSelectedCategoryIndices(selectedArray);
    forceUpdate(n => !n)
  }

  function handleClick() {
    // alert('You clicked the Chip.');
  }


  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setPartners([]);
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleMultiMenuItemClick(event, index) {
    setSelectedCategoryIndices(selectedCategoryIndices => [
      ...selectedCategoryIndices,
      options[index]
    ]);
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
    <CustomTabs
      variant="fullWidth"
      title="Partnerships:"
      headerColor="primary"
      tabs={[
        {
          tabName: "Partner List",
          tabIcon: SupervisedUserCircleIcon,
          tabContent: (
            <>
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
            <GridItem xs={12} sm={12} md={12}>
              {!loader?
                <Card plain>
                    <MaterialTable
                        columns={[
                          { title: "OrganizationID", field: "organizationID"},
                          { title: "Organization Name", field: "name"}

                        ]}
                        data={partners}
                        title="Partners in the selected category"
                        options={{
                          search: true,
                          exportButton: true
                        }}
                        localization={{
                          body: {
                            emptyDataSourceMessage: "No organizations in the selected Category"
                          }
                        }}
                      />
                </Card>:
                  <React.Fragment>
                    <Card plain>
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
            </>
          )
        },
        {
          tabName: "Enlist your organization as Partner",
          tabIcon: SupervisedUserCircleIcon,
          tabContent: (
            <>
            <Paper>
            <List component="nav">
                <ListItem
                  button
                  aria-haspopup="true"
                  onClick={handleClickListItem}
                >
                <ListItemText primary="Select Category/Categories to Enlist Your Organization in" />
                </ListItem>
                <ListItem>
                  {selectedCategoryIndices.map((category, index) => (
                      <Chip
                        label= {category}
                        onClick={handleClick}
                        onDelete={() => handleDelete(category)}
                        className={classes.chip}
                        variant="outlined"
                      />
                  ))}

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
                    disabled={selectedCategoryIndices.indexOf(option)!=-1}
                    onClick={event => handleMultiMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
            </Menu>
            <br/>
              <GridContainer>
              {selectedCategoryIndices.map((category, index) => (
                <GridItem xs={12} sm={12} md={4}>
                  <DropzoneArea
                    dropzoneText={"Upload supporting documents for "+options[category]}
                    onSave={() => {}}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    />
                </GridItem>
              ))}
              </GridContainer>
            </>
          )
        }
      ]}
    />
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
