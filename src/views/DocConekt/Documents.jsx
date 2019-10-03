import React, { Suspense, useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import { openDocModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { docContract, docAddress } from 'DocContract'
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { decryptMessage } from 'utils'
import moment from "moment";
import AssignProject from "views/Products/AssignProject";
import Modal from "components/CustomModal/Modal";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { CircularProgress } from '@material-ui/core';
import web3 from '../../web3';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const loading = <LinearProgress />;
const RegisterDocModal = React.lazy(() => import('views/RegisterDocModal'));


const Products = (props) => {
  // console.log(props.match.params.projectID === undefined);
  const [assignProductModal, setAssignProductModal] = useState(false);
  const [tokenIDList, setTokenIDList] = useState([])
  const [productList, setProductList] = useState([])
  const [password, setPassword] = useState("");
  const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  function handleClose() {
    setOpen(false);
  }

  function handleUnlock(rowData) {
    if (rowData.encryptedPassword === " ") {
      let url = "https://gateway.arthanium.org/ipfs/" + rowData.encryptedData
      window.open(url, "_blank")
    } else {
      console.log(rowData, "idhar");
      setSelected(rowData);
      setOpen(true);
    }

  }

  async function unlockDoc() {
    let data = await decryptMessage(selected.encryptedData, password)
    console.log(data);
    setData(JSON.parse(data));
    setIsValid(true);
  }

  useEffect(() => {
    try {
      if (props.user.user[5] != 0) {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }
    if (props.match.params.projectID === undefined) {
      docContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
        from: props.auth.user.publicKey
      }).then(res => {
        if (res.length == 0)
          setLoader(false);
        setTokenIDList(res);
        res.forEach(tokenId => {
          // console.log(tokenId);

          docContract.methods.getDocumentDetails(tokenId).call({
            from: props.auth.user.publicKey
          }).then(productDetails => {
            console.log(productDetails, "productDetails inside");
            productDetails[0].projectId = (productDetails[0].projectId == 0x0000000000000000000000000000000000000000000000000000000000000000) ?
              "Unassigned" :
              productDetails[0].projectId;
            productDetails[0].tokenId = tokenId
            setProductList(productList => [
              ...productList,
              productDetails[0]
            ])
            setLoader(false);
          });
        });
      });
    } else {
      // console.log("inside");

      docContract.methods._tokensOfProject(props.match.params.projectID).call({
        from: props.auth.user.publicKey
      }).then(res => {
        // console.log(res,"res");

        if (res.length == 0)
          setLoader(false);
        setTokenIDList(res);
        res.forEach(tokenId => {
          // console.log(tokenId,"projectID");

          docContract.methods.getDocumentDetails(tokenId).call({
            from: props.auth.user.publicKey
          }).then(productDetails => {
            // console.log(productDetails, "productDetails inside");

            productDetails[0].tokenId = tokenId
            setProductList(productList => [
              ...productList,
              productDetails[0]
            ])
            setLoader(false);
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    // console.log("productList");
  }, [productList])
  const projectURL = (projectID) => {
    return "/dashboard/projects/" + projectID;
  }


  const addProductsToProject = (data1) => {
    // console.log(data1);
    setAssignProductModal(true);
    setSelectedItems(data1);
  }

  async function assignProductsToProject() {
    setLoading(true);
    let address = localStorage.getItem("address");
    let privateKey = await sessionStorage.getItem('privateKey');
    let nonce = await web3.eth.getTransactionCount(address);
    var batch = new web3.BatchRequest();
    console.log(selectedItems);
    selectedItems.forEach(element => {
      var transaction = {
        "nonce": nonce,
        "to": docAddress,
        "data": docContract.methods.setProjectId(
          element.tokenId,
          selectedProject
        ).encodeABI()
      };
      // console.log(transaction);
      // let gasLimit = await web3.eth.estimateGas(transaction);
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then((result) => {
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction)
            .once('receipt', (receipt) => {
              console.log(receipt);
              setLoading(false);
              setAssignProductModal(false);
              // window.location.reload();
            }));
        })
      nonce++
    })
    batch.execute();
  }


  const { classes } = props;

  return (
    <div>
      {
        isValid ? (
          (data.type === "unstructured" ? <Redirect
            to={{
              pathname: "/dashboard/unstructured/",
              state: { data: data, tokenId: selected.tokenId }
            }} /> :
            <Redirect
              to={{
                pathname: "/dashboard/structured/" + data.type,
                state: { hash: data.hash, password: selected.encryptedPassword, tokenId: selected.tokenId }
              }}
            />)
        ) : (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card plain>
                    <CardHeader plain color="primary">
                      <h4 className={classes.cardTitleWhite}>
                        My Document
                </h4>
                      {isAdmin && <AddBoxIcon onClick={props.openDocModal} style={{ float: "right" }} />}
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
                          { title: "Document Id", field: "tokenId" },
                          { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp * 1000).format("DD-MM-YYYY h:mm:ss") },
                          { title: "View Document", field: "action", render: rowData => <Button onClick={() => { handleUnlock(rowData) }}> <ImportContactsIcon /></Button> },
                          { title: "Project ID", field: "projectId", defaultGroupOrder: 0 },
                        ]}
                        data={productList}
                        title=""
                        options={{
                          search: true,
                          exportButton: true,
                          grouping: true,
                          selection: true
                        }}
                        localization={{
                          body: {
                            emptyDataSourceMessage: "No Documents Found!"
                          }
                        }}
                        actions={[
                          // {
                          //   icon: 'folder_open',
                          //   tooltip: 'Open Document',
                          //   onClick: (event, rowData) => handleUnlock(rowData)
                          // },
                          {
                            tooltip: 'Add Selected Devices To Project',
                            icon: 'link',
                            onClick: (event, rowData) => { addProductsToProject(rowData) }
                          }
                        ]}
                      />
                    }
                  </Card>
                </GridItem>
              </GridContainer>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Enter password to unlock"}</DialogTitle>
                <DialogContent>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Password"
                        id="password"
                        type="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChangeValue={((e) => { setPassword(e.target.value) })}
                        value={password}

                      />
                    </GridItem>
                  </GridContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                  <Button onClick={unlockDoc} color="primary" autoFocus>
                    Submit
            </Button>
                </DialogActions>
              </Dialog>
              <Suspense fallback={loading}>
                <RegisterDocModal projectID={props.match.params.projectID === undefined ? undefined : props.match.params.projectID} {...props} />
              </Suspense>
            </div>
          )
      }
      <Modal
        open={assignProductModal}
        onClose={() => setAssignProductModal(false)}
        title="Assign to Project"
        content={
          <AssignProject userPublicKey={props.auth.user.publicKey} onSelectProject={(e) => {
            // console.log("Selected", e.target.value);
            setSelectedProject(e.target.value);
          }}
            selectedProject={selectedProject}
          />
        }
        action={
          !isLoading ? <Button onClick={assignProductsToProject}>Assign {selectedItems.length} products to Project</Button> : <CircularProgress />
        }

      />
    </div>
  );
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})
export default connect(mapStateToProps, { openDocModal })(withStyles(dashboardStyle)(Products));
