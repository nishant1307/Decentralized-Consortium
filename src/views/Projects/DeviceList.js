import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import MaterialTable, { MTableToolbar } from "material-table";
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
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

const PackingList = props => {
  const { classes } = props;
  const [maintable, setMainTable] = React.useState({
    columns: [
      { title: "Device URN", field: "unitQuantity" },
      { title: "Device URI", field: "noOfPackages" }
    ],
    data: [
      { unitQuantity: "hi", noOfPackages: "3" }
    ]
  });

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Device List</h4>
              <p className={classes.cardCategoryWhite}>
                Project Id: {props.match.params.projectID}
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <MaterialTable
                    style={{ margin: "30px 0 0 0" }}
                    title=""
                    columns={maintable.columns}
                    data={maintable.data}
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
                        onClick: (event, rowData) =>
                          alert("You saved " + rowData.unitQuantity)
                      }
                    ]}
                    components={{
                      Action: props => (
                        <Button
                          onClick={(event) => props.action.onClick(event, props.data)}
                          color="primary"
                          variant="contained"
                          style={{ textTransform: 'none' }}
                          size="small"
                        >
                        Connect To Product
                        </Button>
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

export default withStyles(styles, customInputStyle)(PackingList);
