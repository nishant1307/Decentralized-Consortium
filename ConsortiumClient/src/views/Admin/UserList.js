import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import MaterialTable, { MTableToolbar } from "material-table";
import { registryContract } from '../../registryContract';
import web3 from '../../web3';
import axios from 'axios';
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
  const [mainColumns, setMainColumns] = React.useState([
    { title: "Organization ID", field: "organizationID" },
    { title: "Organization Name", field: "name" },
    { title: "KYC Status", field: "status" },
    { title: "Address", field: "address" },
  ]);
  const [privateKey, setPrivateKey] = React.useState("0x0BD03BEF202592AE5ACA04B41A591B2C4D95E2124F81EDB3A2D657BF09754325");
  const [mainData, setMainData] = React.useState([])

  async function fetchData() {
    // let temp = await sessionStorage.getItem("privateKey")
    // setPrivateKey(temp);
    let data = []
    let fetchedData = await registryContract.methods.getAllOrganizations().call();
    fetchedData.map(async (e, i) => {
      let dataFromIPFS = await axios.get('https://files.arthanium.org/ipfs/' + e.kycHash)
      let KYCStatus = await registryContract.methods.getOrganizationKYCStatus(e.organizationID).call();
      let mainData = {}
      mainData.docs =  dataFromIPFS.data.Docs
      mainData.userAddress = e.externalKey
      mainData.organizationID = e.organizationID;
      mainData.name = e.name;
      mainData.status = KYCStatus === "0" ? "KYC Pending" : KYCStatus === "1" ? "KYC Complete" : "Banned"
      mainData.address = dataFromIPFS.data.info.address1 + dataFromIPFS.data.info.address + dataFromIPFS.data.info.city + dataFromIPFS.data.info.state + dataFromIPFS.data.info.country + dataFromIPFS.data.info.zip
      await data.push(mainData)
      if (i === fetchedData.length - 1) {
        setMainData(data);
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
   console.log("lets see");
  }, [mainData])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Device List</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <MaterialTable
                    style={{ margin: "30px 0 0 0" }}
                    title=""
                    columns={mainColumns}
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
                        emptyDataSourceMessage: "No Device Found"
                      }
                    }}
                    actions={[
                      {
                        icon: "save",
                        tooltip: "Save User",
                        onClick: async (event, rowData, status) => {
                          console.log(rowData);
                          let gasPrice = await web3.eth.getGasPrice();
                          var transaction = {
                            "to": "0x1bc2989c6b4fb2c4d2758a3c9c6229db8697b26d",
                            "data": registryContract.methods.setOrganizationKYCStatus(
                              rowData.organizationID,
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
                                  console.log(data[rowData.tableData.id]);
                                  data[rowData.tableData.id].status = status;
                                  setMainData(data);
                                }
                              }
                            })
                              .on('error', async function (error) {
                                console.log(error);
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
