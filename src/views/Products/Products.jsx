import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
const RegisterThingModal = React.lazy(() => import('views/RegisterThingModal.js'));
import {openThingModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { productContract, productAddress } from 'productContract';
import AssignProject from "views/Products/AssignProject";
import moment from "moment";
import Modal from "components/CustomModal/Modal";
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import web3 from '../../web3';
import AddBoxIcon from '@material-ui/icons/AddBox';
const Products = (props) => {

  const [productList, setProductList] = useState([])
  const [loader, setLoader] = useState(true);
  const [assignProductModal, setAssignProductModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(()=> {
    productContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if(res.length==0)
        setLoader(false);
      res.forEach(tokenId => {
        productContract.methods.getProductDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(productDetails => {
          productDetails[0].projectId= (productDetails[0].projectId==0x0000000000000000000000000000000000000000000000000000000000000000)?
          "Unassigned":
          productDetails[0].projectId;
          productDetails[0].tokenId = tokenId;
          setProductList(productList => [
            ...productList,
            productDetails[0]
          ])
          setLoader(false);
        });
      });
    });
  }, []);

  async function assignProductsToProject() {
    let address = localStorage.getItem("address");
    let privateKey = await sessionStorage.getItem('privateKey');
    let nonce = await web3.eth.getTransactionCount(address);
    var batch = new web3.BatchRequest();
    console.log(nonce);
    selectedItems.forEach(element => {
      var transaction = {
        "nonce": nonce,
        "to": productAddress,
        "data": productContract.methods.setProjectId(
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
            }));
        })
      nonce++
    })
    batch.execute();
  }

  const addProductsToProject = (data1) =>  {
    console.log(data1);
    setAssignProductModal(true);
    setSelectedItems(data1);
  }





  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Products
              </h4>
              {props.user.user[5]!=0 && <AddBoxIcon onClick={props.openThingModal} style={{float: "right"}}/>}
            </CardHeader>
        {loader ?
          <React.Fragment>
                <Skeleton width="100%"/>
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
          </React.Fragment> :
            productList.length != 0  ?
              <MaterialTable
                  columns={[
                    { title: "Product ID", field: "tokenId" },
                    { title: "Product Name", field: "thingName" },
                    { title: "Product Brand", field: "thingBrand" },
                    { title: "Product Images", field: "ipfsHash", render: rowData => <img src={"https://gateway.arthanium.org/ipfs/"+rowData.ipfsHash} height="50px" width="50px"/>},
                    { title: "Product Description", field: "thingDescription"},
                    { title: "Product Story", field: "thingStory"},
                    { title: "Product Value", field: "thingValue"},
                    { title: "Project ID", field: "projectId", defaultGroupOrder: 0 },
                    { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp*1000).format("DD-MM-YYYY h:mm:ss")},
                  ]}
                  data={productList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true,
                    grouping: true,
                    selection: true
                  }}
                  actions={[
                    {
                      tooltip: 'Add Selected Devices To Project',
                      icon: 'link',
                      onClick: (evt, data) => { addProductsToProject(data) }
                    }
                  ]}
                />:
                <h3>No Products Found!</h3>
        }
        </Card>
        </GridItem>
      </GridContainer>
      <RegisterThingModal />
      <Modal
        open={assignProductModal}
        onClose={() => setAssignProductModal(false)}
        title="Assign to Project"
        content={
          <AssignProject userPublicKey = {props.auth.user.publicKey} onSelectProject = {(e) =>
            {
              console.log("Selected", e.target.value);
              setSelectedProject(e.target.value);
            }}
          selectedProject = {selectedProject}
          />
        }
        action={
          <Button onClick={assignProductsToProject}>Assign {selectedItems.length} products to Project</Button>
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
export default connect(mapStateToProps, {openThingModal}) (withStyles(dashboardStyle)(Products));
