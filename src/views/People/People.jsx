import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import LocalOffer from "@material-ui/icons/LocalOffer";
const ColleagueForm = React.lazy(() => import('views/ColleagueForm'))
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button";
import MaterialTable from "material-table";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { registryContract, registryAddress } from "registryContract";
import { connect } from 'react-redux';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from "components/CustomModal/Modal";
import { Icon, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CustomLoader from "components/Loaders/CustomLoader";
import web3 from '../../web3';
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));
const loading = <LinearProgress />;
const People = (props) => {
  const classes2 = useStyles();
  const [allPeople, setPeople] = useState([]);
  const [colleagueForm, setColleagueForm] = useState(false);
  const [alert, setAlert] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // parseJSONFromIPFSHash(props.user.user[4]).then(userDetails => {
    //   setUserName(userDetails.info.fullName);
    // })
    registryContract.methods.getOrganizationEmployees().call({
      from: props.auth.user.publicKey
    }).then(res => {
      let tempData = []
      let i = 1;
      res.forEach(element => {
        registryContract.methods.getUserDetails().call({from:element.publicKey}).then(result => {
          tempData.push(result)    
          if(i === res.length){
            setPeople(tempData) 
          }
          i++;      
        })
      });
    })
  }, []);

  const toggleColleagueForm = () => {
    setColleagueForm(!colleagueForm);
  }

  const handleColleagueFormSubmit = (type, message) => {
    setColleagueForm(!colleagueForm);
    console.log(type, message, "type,message")
    setAlert(<Snackbar color={type} open={true} place="bl" className={classes2.margin} message={message} />
    );
    setTimeout(
      function () {
        setAlert('');
      }
        .bind(this),
      10000
    );
  }

  const makeRegistrantCall = (data) => async () => {
    setLoader(true);
    const privateKey = await sessionStorage.getItem('privateKey')
    console.log("in", data);
    var transaction = {
      "to": registryAddress,
      "data": registryContract.methods.updateUserRole(data.publicKey, 2).encodeABI()
    };

    // web3.eth.estimateGas(transaction).then(gasLimit => {
    transaction["gasLimit"] = 4700000;
    web3.eth.accounts.signTransaction(transaction, privateKey).then(res => {
      web3.eth.sendSignedTransaction(res.rawTransaction).on('receipt', async function (receipt) {
        console.log(receipt);
        if (receipt.status) {
          setLoader(false);
          setAlert(<Snackbar color="success" open={true} place="bl" className={classes2.margin} message="Registrant role updated!" />
          );
          setTimeout(
            function () {
              setAlert('');
            }
              .bind(this),
            10000
          );
        }
      }).on('error', async function (error) {
        console.log(error);
        setLoader(false);
        setAlert(<Snackbar color="danger" open={true} place="bl" className={classes2.margin} message="Error Occured! Please try again later." />
        );
        setTimeout(
          function () {
            setAlert('');
          }
            .bind(this),
          10000
        );
      })
    })
  }
  const makeAdminCall = () => () => {
    console.log("in");

  }

  const fetchRoleFromRoleCode = (roleCode) => {
    switch (roleCode) {
      case "0": return "Regular"
      case "1": return "Admin"
      case "2": return "Registrant"
    }
  }

  const fetchAction = (data) => {
    switch (data.role) {
      case "0": return <Button color="primary" onClick={makeRegistrantCall(data)}>Make Registrant</Button>
      case "1": return "No action"
      case "2": return <Button color="primary" onClick={makeAdminCall(data)}>Make Admin</Button>
    }
  }

  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Employees in your Organization
            </h4>
              {props.user.user[5] === "1" && <AddBoxIcon onClick={toggleColleagueForm} style={{ float: "right" }} />}
            </CardHeader>
            <MaterialTable
              columns={[
                { title: "Email", field: "email" },
                { title: "PublicKey", field: "publicKey" },
                { title: "Employee Role", field: "role", render: rowData => fetchRoleFromRoleCode(rowData.role) },
                { title: "Action", field: "role", render: rowData => fetchAction(rowData) }
              ]}
              data={allPeople}
              title=""
              options={{
                search: true,
                exportButton: true
              }}
            />
          </Card>
        </GridItem>
      </GridContainer>
      <Suspense fallback={loading}>
        <Modal
          open={colleagueForm}
          onClose={toggleColleagueForm}
          title={"New Colleague Form"}
          content={
            <ColleagueForm onColleagueFormSubmit={handleColleagueFormSubmit} {...props} />
          }
        />
      </Suspense>
      {alert}
      {loader && <CustomLoader />}
    </div>
  );
}

People.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(dashboardStyle)(People));
