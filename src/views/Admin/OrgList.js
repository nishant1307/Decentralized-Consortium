import React, { Suspense, useState, useEffect } from "react";
// nodejs library to set properties for components
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { registryContract, registryAddress } from '../../registryContract';
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import moment from "moment";
import web3 from '../../web3';
import axios from 'axios';
import Modal from "components/CustomModal/Modal";
import MaterialTable from "material-table";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
//create your forceUpdate hook
function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}

const Partners = (props) => {
  const [loader, setLoader] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalStatus] = useState(false);
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
  const forceUpdate = useForceUpdate();
  const [mainData, setMainData] = React.useState([])
  const [modalData, setModalData] = React.useState({});


  useEffect(() => {
    setLoading(true);
    setLoader(true);
    let data = []
    registryContract.methods.getAllOrganizations().call().then((fetchedData) => {
      fetchedData.map(async (e, i) => {
        let dataFromIPFS = await axios.get('https://gateway.arthanium.org/ipfs/' + e.kycHash)
        let KYCStatus = await registryContract.methods.getOrganizationKYCStatus(e.organizationID).call();
        let mainData = {}
        mainData.docs = dataFromIPFS.data.Docs
        mainData.userAddress = e.externalKey
        mainData.organizationID = e.organizationID;
        mainData.name = e.name;
        mainData.status = KYCStatus === "0"
          ? "KYC Pending"
          : KYCStatus === "1"
            ? "KYC Complete"
            : "Banned"
        mainData.address = dataFromIPFS.data.info.address1 +" "+ dataFromIPFS.data.info.address +" "+ dataFromIPFS.data.info.city +" "+ dataFromIPFS.data.info.state +" "+ dataFromIPFS.data.info.country +" "+ dataFromIPFS.data.info.zipcode
        await data.push(mainData)
        if (i === fetchedData.length - 1) {
          console.log(data, "data");
          setMainData(data);
          setLoader(false);
          forceUpdate();
        }
      })
    })
    setLoading(false);
    forceUpdate();
  }, [])


  const updateStatus = (rowData, status) => async () => {
    console.log(rowData, status);
    const privateKey = await sessionStorage.getItem("privateKey")
    setLoading(true);
    let gasPrice = await web3.eth.getGasPrice();
    var transaction = {
      "to": registryAddress,
      "data": registryContract.methods.setOrganizationKYCStatus(rowData.organizationID, status).encodeABI(),
      gasPrice: gasPrice
    };
    transaction["gasLimit"] = 4700000;
    web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
      web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 1) {
          if (receipt.status == true) {
            const data = mainData;
            console.log(data[rowData.tableData.id]);
            data[rowData.tableData.id].status = status === 0
              ? "KYC Pending"
              : status === 1
                ? "KYC Complete"
                : "Banned"
            setMainData(data);
            setModalStatus(false);
            setLoading(false);
            setLoader(false)
            forceUpdate();
            setSnackbar({ color: "success", open: true, message: "Status Updated" });
            setTimeout(() => {
              setSnackbar({ color: "success", open: false, message: "" });
            }, 30000)
          }
        }
      }).on('error', async function (error) {
        // console.log(error);
        setLoading(false);
        setSnackbarMessage("Error occured!");
        setIsSnackbarOpen(true);
        setTimeout(() => {
          setIsSnackbarOpen(false);
        }, 10000)
      })
    })
  }

  const openKYCmodal = (rowData) => () => {
    setModalStatus(true);
    setModalData(rowData);
    forceUpdate();
  }

  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Category List
                            </h4>
            </CardHeader>
            {loader ?
              <React.Fragment>

                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
              </React.Fragment> :
              <MaterialTable
                columns={[
                  {
                    title: "Organization ID",
                    field: "organizationID"
                  }, {
                    title: "Organization Name",
                    field: "name"
                  }, {
                    title: "KYC Status",
                    field: "status",
                    render: rowData => {
                      return (rowData.status === "KYC Complete" ? <DoneAllIcon /> : rowData.status === "KYC Pending" ? <HourglassEmptyIcon /> : <BlockIcon />)
                    }
                  }, {
                    title: "Address",
                    field: "address"
                  },
                  {
                    field: 'kycHash',
                    title: 'Documents',
                    render: rowData => {
                      return (
                        <>
                          <Button onClick={openKYCmodal(rowData)} variant="contained" color="primary">View Documents </Button>
                        </>)
                    }
                  },
                ]}
                data={mainData}
                title=""
                options={{
                  search: true,
                  exportButton: false,
                  grouping: true,
                  paginationType: "stepped",
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "No Devices Found!"
                  }
                }}
              />
            }
          </Card>
        </GridItem>
      </GridContainer>
      {isModalOpen && <Modal
        open={isModalOpen}
        onClose={() => {
          setModalStatus(false)
          setModalData({});
          forceUpdate();
        }
        }
        title="Documents"
        content={
          modalData.docs.map((element) => {
            let url = "https://gateway.arthanium.org/ipfs/" + element
            return (<GridItem xs={12} sm={12} md={4}>
              <img src={url} alt="boohoo" width="200" height="200" onClick={() => {
                window.open(url, "_blank")
              }} className="img-responsive" />
            </GridItem>)
          })
        }
        action={
          !isLoading ? <div>
            {modalData.status !== "KYC Complete" && <Button onClick={updateStatus(modalData, 1)} color="primary" variant="contained" style={{
              textTransform: 'none', margin: 10
            }} size="sm">
              Accept
          </Button>}
            {modalData.status !== "KYC Pending" && < Button onClick={updateStatus(modalData, 0)} color="primary" variant="contained" style={{
              textTransform: 'none', margin: 10
            }} size="sm">
              On Hold
                            </Button>}
            {modalData.status !== "Banned" && <Button onClick={updateStatus(modalData, 2)} color="primary" variant="contained" style={{
              textTransform: 'none', margin: 10
            }} size="sm">
              Reject
                            </Button>}
          </div> : <CircularProgress />
        }

      />}
      < Snackbar color={snackbar.color} open={snackbar.open} place="bl" className={classes.margin} message={snackbar.message} />
    </div >
  );
}




export default (withStyles(dashboardStyle)(Partners));
