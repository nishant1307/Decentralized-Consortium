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
const RegisterDeviceModal = React.lazy(() => import('views/RegisterDeviceModal.js'));
import {openDeviceModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import docContract from 'DocContract';
import moment from "moment";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
const Documents = (props) => {

  const [tokenIDList, setTokenIDList] = useState([])
  const [docList, setDocList] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(()=> {
    docContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      setTokenIDList(res);
      res.forEach(tokenId => {
        docContract.methods.getDeviceDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(docDetails => {
          setDocList(docList => [
            ...docList,
            docDetails
          ])
          setLoader(false);
        });
      });
    });
  }, []);

  useEffect(()=> {
    console.log(docList);
  }, [docList]);
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
                My Documents
              </h4>
              <AddBoxIcon onClick={props.openDeviceModal}/>
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
            docList.length !== 0  ?
              <MaterialTable
                  columns={[
                    { title: "Device URN", render: rowData => tokenIDList[rowData.tableData.id]},
                    { title: "Device Type", field: "deviceType" },
                    { title: "Communication Protocol", field: "communicationProtocol" },
                    { title: "Data Protocol", field: "dataProtocol"},
                    { title: "Sensor", field: "sensor"},
                    { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp*1000).format("DD-MM-YYYY h:mm:ss")},
                  ]}
                  data={docList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true,
                    grouping: true,
                    paginationType: "stepped"
                  }}
                />:
                <h3>No Documents Found!</h3>
        }
        </Card>
        </GridItem>
      </GridContainer>
      <RegisterDeviceModal />
    </div>
  );
}

Documents.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})
export default connect(mapStateToProps, {openDeviceModal}) (withStyles(dashboardStyle)(Documents));
