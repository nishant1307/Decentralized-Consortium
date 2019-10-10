import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from "material-table";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import CustomTabs from "components/CustomTabs/CustomTabs";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { registryContract } from 'registryContract';
import { partnerContract, partnerAddress } from 'partnersContract';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Typography from '@material-ui/core/Typography';
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import { connect } from 'react-redux';
import ipfs from 'ipfs.js';
const IPFS = require('ipfs-http-client')
import web3 from '../../web3';
import moment from "moment";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Paper,
  Chip,
  CircularProgress
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const Partners = (props) => {
  const { classes } = props;

  const [partners, setPartners] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, forceUpdate] = useState();
  const [selectedCategoryIndices, setSelectedCategoryIndices] = useState([]);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [certificateFiles, setCertificateFiles] = useState([]);
  const [options, setOptions] = useState(["Agent",
    "Bank",
    "Brand",
    "Buyer",
    "Certification Agency",
    "Consumer",
    "Customs / Authorities",
    "Distributor",
    "Environmental Health & Safety",
    "Facility Maintenance",
    "Field Services",
    "Government",
    "Hardware Integrator",
    "Human Resources",
    "Infrastructure",
    "Insurance",
    "Logistics",
    "Logistics - 3PL",
    "Logistics - Intermodal",
    "Logistics - Ocean Carriers",
    "Maintenance",
    "Marketing",
    "Material Supplier",
    "Municipal / Local Body",
    "Ports / Terminals",
    "Power / Energy",
    "Procurement & Sourcing",
    "Product Development",
    "Production - Manufacturing",
    "Production - Natural Resources",
    "Quality Assurance",
    "Real Estate / Property Management",
    "Recycling",
    "Research & Development",
    "Seller",
    "Software Integrator",
    "Telecom",
    "Traffic Management",
    "Transportation",
    "Utility",
    "Warehouse Management",
    "Warehousing",
    "Waste Management"])
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
  let options2 = [
    'Select Here',
    "Agent",
    "Bank",
    "Brand",
    "Buyer",
    "Certification Agency",
    "Consumer",
    "Customs / Authorities",
    "Distributor",
    "Environmental Health & Safety",
    "Facility Maintenance",
    "Field Services",
    "Government",
    "Hardware Integrator",
    "Human Resources",
    "Infrastructure",
    "Insurance",
    "Logistics",
    "Logistics - 3PL",
    "Logistics - Intermodal",
    "Logistics - Ocean Carriers",
    "Maintenance",
    "Marketing",
    "Material Supplier",
    "Municipal / Local Body",
    "Ports / Terminals",
    "Power / Energy",
    "Procurement & Sourcing",
    "Product Development",
    "Production - Manufacturing",
    "Production - Natural Resources",
    "Quality Assurance",
    "Real Estate / Property Management",
    "Recycling",
    "Research & Development",
    "Seller",
    "Software Integrator",
    "Telecom",
    "Traffic Management",
    "Transportation",
    "Utility",
    "Warehouse Management",
    "Warehousing",
    "Waste Management"
  ];
  function handleDelete(category) {
    // console.log(selectedCategoryIndices);
    // console.log(category, "to be removed");
    let selectedArray = selectedCategoryIndices;
    if (selectedCategoryIndices.indexOf(category) != -1) {
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
    // console.log(index);
    setLoader(true);
    let tempData = []
    allPartners.forEach(element => {
      if (element.category === options2[index]) {
        tempData.push(element);
        setPartners(tempData);
      }
    });
    setLoader(false)
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

  const HandleSubmit = async () => {
    setLoading(true);
    uploadOnIPFS().then(async (result, error) => {
      if (error) {
        console.log(error);
        setLoading(false);
        setSnackbar({ color: "danger", open: true, message: "Network error Occured! Please try again later." });
        setTimeout(() => {
          setSnackbar({ color: "success", open: false, message: "" });
        }, 10000)
      }
      const privateKey = await sessionStorage.getItem('privateKey');
      var transaction = {
        "to": partnerAddress,
        "data": partnerContract.methods.addCategory(
          result._category,
          result._documentHash
        ).encodeABI()
      };
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              window.location.reload();
            })
            .on('error', async function (error) {
              console.log(error);
              setLoading(false);
              setSnackbar({ color: "danger", open: true, message: "Network error Occured! Please try again later." });
              setTimeout(() => {
                setSnackbar({ color: "success", open: false, message: "" });
              }, 10000)
            })
        })
    })
  }

  function uploadOnIPFS() {
    return new Promise((resolve, reject) => {
      let _category = [];
      let _documentHash = [];
      let i = 0;
      certificateFiles.forEach(element => {
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(element.file);
        reader.onloadend = (res) => {
          let content = IPFS.Buffer.from(res.target.result);
          ipfs.add(content, (err, newHash) => {
            if (err) {
              reject();
            }
            _documentHash.push(newHash[0].hash)
            _category.push(element.category)
            i++;
            if (certificateFiles.length === i) {
              resolve({ _category: _category, _documentHash: _documentHash })
            }
          })
        }

      })
    })
  }

  const handleDropzone = (file, category) => {
    setCertificateFiles([...certificateFiles, { "file": file, "category": category }])
  }

  const deleteDropzoneFile = (file, category) => {
    // console.log("inside");
    let temp = certificateFiles;
    temp.splice(temp.findIndex(e => e.file === file && e.category === category), 1);
    // console.log(temp);
    setCertificateFiles(temp);
  }

  function fetchPartnerList() {
    partnerContract.methods.getAllCategory().call({
      from: "0x66911a74374dF86b19317f9C7F515FC18C5347C2"
    }).then(res => {
      let tempData = [];
      res.forEach(element => {
        if (element.status) {
          registryContract.methods.getOrganizationDetailsByorganizationID(element.organizationID).call().then(res => {
            element.name = res.name;
            tempData.push(element)
            setAllPartners(tempData);
            setLoader(false);

          })
        }
      });
    });
  }


  // useEffect(() => {

  // }, [selectedIndex]);

  useEffect(() => {
    fetchPartnerList();
    setLoader(true);
    partnerContract.methods.getCategory().call({
      from: props.auth.user.publicKey
    }).then(async res => {
      // console.log(res);
      setFetchedCategories(res);
      let temp = options;
      await res.forEach(element => {
        // console.log(element, temp);
        temp.splice(temp.findIndex(e => e === element.category), 1);
      });
      // console.log(temp)
      setOptions(temp);
      // setLoader(false);
    })
  }, []);

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
                      <ListItemText primary="Select Organization Type &#8681;" secondary={options2[selectedIndex]} />
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
                  {options2.map((option, index) => (
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
                  {!loader ?
                    <Card plain>
                      <MaterialTable
                        columns={[
                          { title: "OrganizationID", field: "organizationID" },
                          { title: "Organization Name", field: "name" }

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
                    </Card> :
                    <React.Fragment>
                      <Card plain>
                        <Skeleton width="100%" />
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
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} variant="middle" />
                    <ListItem>
                      {selectedCategoryIndices.map((category, index) => (
                        <Chip
                          label={category}
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
                      disabled={selectedCategoryIndices.indexOf(option) != -1}
                      onClick={event => handleMultiMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
                <br />
                <GridContainer>
                  {selectedCategoryIndices.map((category, index) => (
                    <GridItem xs={12} sm={12} md={4}>
                      <DropzoneArea
                        dropzoneText={"Upload supporting documents for " + category}
                        // onSave={(file) => { console.log(file);}}
                        onDrop={(file) => { handleDropzone(file, category) }}
                        onDelete={(file) => { deleteDropzoneFile(file, category) }}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'application/pdf']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        filesLimit={1}
                      />
                    </GridItem>
                  ))}
                  <ListItem>
                    {isLoading ? <CircularProgress className={classes.progress} /> : <Button onClick={HandleSubmit}>Submit</Button>}
                  </ListItem>
                </GridContainer>
              </>
            )
          },
          {
            tabName: "Your Organization Categories",
            tabIcon: TransitEnterexitIcon,
            tabContent: (
              <>
                {/* <Paper> */}
                <GridContainer>
                  {fetchedCategories.map((element, key) => {
                    let time = moment(element.timeStamp * 1000).format("DD-MM-YYYY");
                    const url = "https://gateway.arthanium.org/ipfs/" + element.documentHash;
                    return (
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <Typography variant="h5" component="h2">
                              {element.category}
                            </Typography>
                            <Typography variant="h5" component="h2">
                              {time === "01-01-1970" ? null : time}
                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <iframe onClick={() => {
                              window.open(url, "_blank")
                            }} src={url} height="auto" width="auto"></iframe>
                          </CardBody>
                          <CardFooter>
                            {element.status ? <DoneAllIcon /> : <HourglassEmptyIcon />}
                          </CardFooter>
                        </Card>
                      </GridItem>
                    )
                  })}
                </GridContainer>
                {/* </Paper> */}
                <Snackbar color={snackbar.color} open={snackbar.open} place="br" className={classes.margin} message={snackbar.message} />
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
