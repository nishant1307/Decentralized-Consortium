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
import {productContract} from 'productContract';
import moment from "moment";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
const Products = (props) => {

  const [tokenIDList, setTokenIDList] = useState([])
  const [productList, setProductList] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(()=> {
    productContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      setTokenIDList(res);
      res.forEach(tokenId => {
        productContract.methods.getProductDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(productDetails => {
          setProductList(productList => [
            ...productList,
            productDetails
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Products
              </h4>
              <AddBoxIcon onClick={props.openThingModal}/>
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
            productList.length !== 0  ?
              <MaterialTable
                  columns={[
                    { title: "Product Name", field: "thingName" },
                    { title: "Product Brand", field: "thingBrand" },
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
                />:
                <h3>No Products Found!</h3>
        }
        </Card>
        </GridItem>
      </GridContainer>
      <RegisterThingModal />
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
