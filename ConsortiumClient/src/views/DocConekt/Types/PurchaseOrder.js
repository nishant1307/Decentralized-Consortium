import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialTable, { MTableToolbar } from 'material-table';

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
        minWidth: 120,
    },
});

const PurchaseOrder = props => {
    const { classes } = props;
    const [selectedDate, handleDateChange] = useState(new Date());
    const [struture, setStruture] = useState({});
    const [mod, setMod] = React.useState("Air");
    const [tos, setTos] = React.useState('LCL (CY)')
    const [maintable, setMainTable] = React.useState({
        columns: [
            { title: 'Product Code', field: 'productCode' },
            { title: 'Description of Goods', field: 'descriptionOfGoods' },
            { title: 'Unit Quantity', field: 'unitQuantity' },
            { title: 'Unit Type', field: 'unitType' },
            { title: 'Price', field: 'price' },
            { title: 'Amount', field: 'amount' },
        ],
        data: [

        ],
    });
    const updateProfile = () => {
        console.log("Updated", struture);
    }

    const handleChangeValue = e => {
        const { id, value } = e.target;
        console.log(id, value );
        
        setStruture({ ...struture , [id]: value })
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Purchase Order</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <CustomInput
                                        labelText="Buyer"
                                        id="buyer"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.name}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Purchase Order  Number"
                                        id="purchaseOrderNumber"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.purchaseOrderNumber}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={"CustomInput-formControl-197"}
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Date"
                                            format="MM/dd/yyyy"
                                            value={struture.selectedDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setStruture({ ...struture , ["selectedDate"]: date })}
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Seller"
                                        id="seller"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Supplier Reference"
                                        id="supplierReference"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Method of Dispatch</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.mod}
                                            onChange={(e) =>  setStruture({ ...struture , ["mod"] :e.target.value }) }
                                        >
                                            <MenuItem value={"Air"}>Air</MenuItem>
                                            <MenuItem value={"Sea"}>Sea</MenuItem>
                                            <MenuItem value={"Courier"}>Courier</MenuItem>
                                            <MenuItem value={"Road"}>Road</MenuItem>
                                            <MenuItem value={"Rail"}>Rail</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel style={{ width: 250 }} htmlFor="age-helper">Type of Shipment</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.tos}
                                            onChange={(e) => setStruture({ ...struture , ["tos"] :e.target.value })}
                                        >
                                            <MenuItem value={"LCL (CY)"}>LCL (CY)</MenuItem>
                                            <MenuItem value={"FCL (CFS)"}>FCL (CFS)</MenuItem>
                                            <MenuItem value={"Break Bulk"}>Break Bulk</MenuItem>
                                            <MenuItem value={"LCL/FCL (CFS/CY) "}>LCL/FCL (CFS/CY) </MenuItem>
                                            <MenuItem value={"FCL/LCL (CY/CFS) "}>FCL/LCL (CY/CFS) </MenuItem>
                                            <MenuItem value={"Reefer"}>Reefer</MenuItem>

                                        </Select>
                                    </FormControl>
                                </GridItem>

                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Port of Loading"
                                        id="portOfLoading"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Port of Discharge"
                                        id="portOfDischarge"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Terms / Method of Payment"
                                        id="Mop"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <MaterialTable
                                        style={{ margin: '30px 0 0 0' }}
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
                                                emptyDataSourceMessage: 'Click on + to add Record'
                                            }
                                        }}
                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise(resolve => {
                                                    setTimeout(() => {
                                                        resolve();
                                                        const data = [...maintable.data];
                                                        data.push(newData);
                                                        setMainTable({ ...maintable, data });
                                                    }, 600);
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise(resolve => {
                                                    setTimeout(() => {
                                                        resolve();
                                                        const data = [...maintable.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        setMainTable({ ...maintable, data });
                                                    }, 600);
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise(resolve => {
                                                    setTimeout(() => {
                                                        resolve();
                                                        const data = [...maintable.data];
                                                        data.splice(data.indexOf(oldData), 1);
                                                        setMainTable({ ...maintable, data });
                                                    }, 600);
                                                }),
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Additional Information"
                                        id="additionalInformation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Additional Charges & Discounts"
                                        id="additionalChargesDiscounts"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Consignment Total"
                                        id="consignmentTotal"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Place of Issue"
                                        id="placeOfIssue"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Date of Issue"
                                        id="dateOfIssue"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Signatory Company"
                                        id="signatoryCompany"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Name of Authorized Signatory"
                                        id="nameOfAS"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Signature"
                                        id="signature"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={updateProfile}>Submit</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
};


export default withStyles(styles, customInputStyle)(PurchaseOrder);
