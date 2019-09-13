import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Skeleton from '@material-ui/lab/Skeleton';
const RegisterThingModal = React.lazy(() => import('views/RegisterThingModal.js'));
import {openThingModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {productContract} from 'productContract';
import moment from "moment";
import LinkIcon from '@material-ui/icons/Link';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Icon } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
const Products = (props) => {

  const [tokenIDList, setTokenIDList] = useState([])
  const [productList, setProductList] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(()=> {
    productContract.methods._tokensOfProject(props.match.params.projectID).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if(res.length==0)
        setLoader(false);
      setTokenIDList(res);
      res.forEach(tokenId => {
        productContract.methods.getProductDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(productDetails => {
          setProductList(productList => [
            ...productList,
            productDetails[0]
          ])
          setLoader(false);
        });
      });
    });
  }, []);

  useEffect(()=> {
    console.log(productList);
  }, [productList])
  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Products belonging to this Project
              </h4>
              {/**<LinkIcon style={{float: "right"}} />*/}
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
              <MaterialTable
                  columns={[
                    { title: "Product Name", field: "thingName" },
                    { title: "Product Brand", field: "thingBrand" },
                    { title: "Product Images", field: "ipfsHash", render: rowData => <img src={"https://gateway.arthanium.org/ipfs/"+rowData.ipfsHash} height="50px" width="50px"/>},
                    { title: "Product Description", field: "thingDescription"},
                    { title: "Product Story", field: "thingStory"},
                    { title: "Product Value", field: "thingValue"},
                    { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp*1000).format("DD-MM-YYYY h:mm:ss")},
                  ]}
                  data={productList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true,
                    grouping: true
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "No Products Assigned to this Project Yet!"
                    }
                  }}
                />
        }
        </Card>
        </GridItem>
      </GridContainer>
      <RegisterThingModal projectId={props.match.params.projectID} />
    </>
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
