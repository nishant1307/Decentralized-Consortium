import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { decryptMessage } from 'utils'
const RegisterDocModal = React.lazy(() => import('views/RegisterDocModal'));


const Products = (props) => {

  const [tokenIDList, setTokenIDList] = useState([])
  const [productList, setProductList] = useState([])
  const [password, setPassword] = useState("");
  const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = React.useState(false);



  function handleClose() {
    setOpen(false);
  }

  function handleUnlock(rowData) {
    console.log(rowData);
    setSelected(rowData);
    setOpen(true);
  }

  async function unlockDoc() {
    let data = await decryptMessage(selected.encryptedData, password)
    console.log(data);
    setData(data);
    // return (<Redirect
    //   to={{
    //     pathname: "/dashboard/structured/" + data.type,
    //     state: { referrer: data.hash }
    //   }}
    // />)

  }

  useEffect(() => {
    docContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if(res.length==0)
        setLoader(false);
      setTokenIDList(res);
      res.forEach(tokenId => {
        // console.log(tokenId);

        docContract.methods.getDocumentDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(productDetails => {
          productDetails[0].tokenId = tokenId
          setProductList(productList => [
            ...productList,
            productDetails[0]
          ])
          setLoader(false);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log("productList");
  }, [productList])
  const projectURL = (projectID) => {
    return "/dashboard/projects/" + projectID;
  }
  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Document
              </h4>
              <AddBoxIcon onClick={props.openDocModal} />
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
              productList.length !== 0 ?
                <MaterialTable
                  columns={[
                    { title: "Document Id", field: "tokenId" },
                  ]}
                  data={productList}
                  title=""
                  options={{
                    search: true,
                    exportButton: false,
                    grouping: false
                  }}
                  actions={[
                    {
                      icon: 'folder_open',
                      tooltip: 'Open Document',
                      onClick: (event, rowData) => handleUnlock(rowData)
                    }
                  ]}
                /> :
                <h3>No Products Found!</h3>
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
      <RegisterDocModal />
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
