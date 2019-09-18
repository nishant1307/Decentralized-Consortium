import React, { useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import MaterialTable, { MTableToolbar } from "material-table";
import { registryContract, registryAddress } from '../../registryContract';
import web3 from '../../web3';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    margin: theme.spacing(120),
    minWidth: 120
  }
});

const OrgList = props => {
  const { classes } = props;
  const [privateKey, setPrivateKey] = React.useState("");
  const [mainData, setMainData] = React.useState([])

  async function fetchData() {
    // let temp = await sessionStorage.getItem("privateKey")
    // setPrivateKey(temp);
    let data = []
    let fetchedData = await registryContract.methods.getAllUsers().call();
    let temp = await sessionStorage.getItem("privateKey")
    setPrivateKey(temp);
    fetchedData.map(async (e, i) => {
      // console.log("Here");
      let dataFromIPFS = await axios.get('https://gateway.arthanium.org/ipfs/' + e.kycHash)
      let KYCStatus = await registryContract.methods.getUserKYCStatus().call({
        from: e.publicKey
      })
      let mainData = {}
      mainData.userAddress = e.publicKey
      mainData.docs = dataFromIPFS.data.Docs
      mainData.organizationID = e.organizationID;
      mainData.companyName = dataFromIPFS.data.info.companyName
      mainData.role = e.role === "1" ? "Admin" : e.role === "2" ? "Regular" : "Registrant"
      mainData.status = KYCStatus === "0" ? "KYC Pending" : KYCStatus === "1" ? "KYC Complete" : "Banned"
      mainData.email = e.email
      mainData.fullName = dataFromIPFS.data.info.fullName
      mainData.address = dataFromIPFS.data.info.address1 + dataFromIPFS.data.info.address + dataFromIPFS.data.info.city + dataFromIPFS.data.info.state + dataFromIPFS.data.info.country + dataFromIPFS.data.info.zip
      await data.push(mainData)
      if (i == fetchedData.length - 1) {
        // console.log(data, "data");
        setMainData(data);
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Organization List</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <MaterialTable
                    style={{ margin: "30px 0 0 0" }}
                    title=""
                    columns={[
                      { title: "Organization ID", field: "organizationID" },
                      { title: "Organization Name", field: "companyName" },
                      { title: "Role", field: "role" },
                      { title: "KYC Status", field: "status" },
                      { title: "Email", field: "email" },
                      { title: "Full Name", field: "fullName" },
                      { title: "Address", field: "address" },
                    ]}
                    data={mainData}
                    components={{
                      Toolbar: props => (
                        <div>
                          <MTableToolbar {...props} />
                        </div>
                      )
                    }}
                    localization={{
                      toolbar: {
                        showColumnsTitle: "Total"
                      },
                      body: {
                        emptyDataSourceMessage: "No Organizations Found"
                      }
                    }}
                    actions={[
                      {
                        icon: "save",
                        tooltip: "Save User",
                        onClick: async (event, rowData, status) => {
                          // console.log(rowData);
                          let gasPrice = await web3.eth.getGasPrice();
                          var transaction = {
                            "to": registryAddress,
                            "data": registryContract.methods.setUserKYCStatus(
                              rowData.userAddress,
                              status
                            ).encodeABI(),
                            gasPrice: gasPrice
                          };
                          transaction["gasLimit"] = 4700000;
                          web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
                            web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function (confirmationNumber, receipt) {
                              if (confirmationNumber == 1) {
                                if (receipt.status == true) {
                                  const data = mainData;
                                  // console.log(data[rowData.tableData.id]);
                                  data[rowData.tableData.id].status = "KYC Complete";
                                  setMainData(data);
                                }
                              }
                            })
                              .on('error', async function (error) {
                                // console.log(error);
                              })
                          })
                        }
                      },
                    ]}
                    components={{
                      Action: props => (
                        <div>
                          <Button
                            onClick={(event) => props.action.onClick(event, props.data, 1)}
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'none' }}
                            size="sm"
                          >
                            Accept
                        </Button>
                          <Button
                            onClick={(event) => props.action.onClick(event, props.data, 0)}
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'none' }}
                            size="sm"
                          >
                            On Hold
                       </Button>
                          <Button
                            onClick={(event) => props.action.onClick(event, props.data, 2)}
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'none' }}
                            size="sm"
                          >
                            Reject
                      </Button>
                        </div>
                      ),
                    }}
                    detailPanel={rowData => {
                      return (
                        <GridContainer>
                          {rowData.docs.map((element) => {
                            let url = "https://gateway.arthanium.org/ipfs/" + element
                            return (
                              <GridItem xs={12} sm={12} md={4}>
                                <img src={url} alt="boohoo" width="200" height="200" onClick={()=>{  window.open(url, "_blank") }} className="img-responsive"/>
                              </GridItem>
                            )
                          })}

                        </GridContainer>
                      )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default withStyles(styles, customInputStyle)(OrgList);
