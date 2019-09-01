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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { country, currency, currencyCode } from '../../../assets/data/countryList'
import { encryptMessage, decryptMessage } from 'utils'
import { addNewDoc, updateDoc } from 'actions/userActions';
import { connect } from 'react-redux';
import ipfs from '../../../ipfs';
import { withStyles } from '@material-ui/core/styles';
const Ipfs = require('ipfs-http-client')

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

const PackingList = props => {
    const { classes } = props;
    const [struture, setStruture] = useState({});
    // const [mod, setMod] = React.useState("Air");
    // const [tos, setTos] = React.useState('LCL (CY)')
    const [password, setPassword] = useState("");
    const [isNew, setIsNew] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [maintable, setMainTable] = React.useState({
        columns: [
            { title: 'Unit Quantity', field: 'unitQuantity' },
            { title: 'Kind & No of Packages', field: 'noOfPackages' },
            { title: `Net Weight of Package (Kg)`, field: 'weightOfPackage' },
            { title: `Gross Weight of Package (Kg)`, field: 'grossWeightOfPackage' },
            { title: `Measurements of Package (m³)`, field: 'measurementsOfPackages' },
        ],
        data: [

        ],
    });
    async function handleUpdate() {
        setIsSubmitted(true)
        let privateKey = await sessionStorage.getItem('privateKey');
        let password = await decryptMessage(props.data.password, privateKey)
        const content = Ipfs.Buffer.from(JSON.stringify({ formData: struture, tableData: maintable.data }))
        const cid = await ipfs.add(content);
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash,  "type": "Packing List" }), password)
        props.updateDoc(encryptData, props.data.tokenId, struture.remark);
        setIsSubmitted(false)
        // props.history.push("/dashboard/home")
    }

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const submitDocument = async () => {
        setIsSubmitted(true)
        let privateKey = await sessionStorage.getItem('privateKey');
        const content = Ipfs.Buffer.from(JSON.stringify({ formData: struture, tableData: maintable.data }))
        const cid = await ipfs.add(content);
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash, "type": "Packing List" }), password)
        let encryptedPassword = await encryptMessage(password, privateKey)
        // console.log(encryptData, encryptedPassword);
        setIsSubmitted(false);
        setOpen(false);
        setStruture({});
        setMainTable({
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
        props.addNewDoc({ encryptData: encryptData, encryptedPassword: encryptedPassword });
        props.history.push("/dashboard/home")

    }


    const handleChangeValue = e => {
        const { id, value } = e.target;
        // console.log(id, value);

        setStruture({ ...struture, [id]: value })
    }



    useEffect(() => {
        if (props.data.hash !== undefined) {
            setIsNew(false);
            ipfs.get(props.data.hash, function (err, files) {
                // console.log(JSON.parse(files[0].content.toString('utf8')));
                let data = JSON.parse(files[0].content.toString('utf8'))
                setMainTable({
                    columns: [
                        { title: 'Product Code', field: 'productCode' },
                        { title: 'Description of Goods', field: 'descriptionOfGoods' },
                        { title: 'Unit Quantity', field: 'unitQuantity' },
                        { title: 'Unit Type', field: 'unitType' },
                        { title: 'Price', field: 'price' },
                        { title: 'Amount', field: 'amount' },
                    ],
                    data: data.tableData
                })
                setStruture(data.formData)
                // files.forEach((file) => {
                //     console.log(file.path)
                //     console.log(file.content.toString('utf8'))
                // })
            })
        }
    }, [])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Packing List</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Invoice Number"
                                        id="invoiceNumber"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.invoiceNumber}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Bill of Lading Number"
                                        id="billofLadingNumber"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.billofLadingNumber}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
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
                                            onChange={date => setStruture({ ...struture, ["selectedDate"]: date })}
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>

                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Reference"
                                        id="reference"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.reference}
                                        
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Buyer Reference"
                                        id="buyerReference"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.buyerReference}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Buyer (If not Consignee)"
                                        id="buyer"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.buyer}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel style={{ width: 250 }} htmlFor="age-helper">Type of Shipment</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.tos}
                                            onChange={(e) => setStruture({ ...struture, ["tos"]: e.target.value })}
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
                                <GridItem xs={12} sm={12} md={3}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Country Of Origin of Goods</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.cOOOG}
                                            onChange={(e) => setStruture({ ...struture, ["cOOOG"]: e.target.value })}
                                        >
                                            {
                                                country.map((value, index) => {
                                                    return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Country of Final Destination</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.cofD}
                                            onChange={(e) => setStruture({ ...struture, ["cofD"]: e.target.value })}
                                        >
                                            {
                                                country.map((value, index) => {
                                                    return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </GridItem>

                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Voyage No"
                                        id="voyageNo"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.voyageNo}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Packing Information"
                                        id="packingInformation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.packingInformation}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={"CustomInput-formControl-197"}
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Date of Departure"
                                            format="MM/dd/yyyy"
                                            value={struture.dateOfDeparture}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setStruture({ ...struture, ["dateOfDeparture"]: date })}
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Final Destination"
                                        id="finalDestination"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.finalDestination}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>

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

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Place of Issue"
                                        id="placeOfIssue"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.placeOfIssue}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Date of Issue"
                                        id="dateOfIssue"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.dateOfIssue}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Signatory Company"
                                        id="signatoryCompany"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.signatoryCompany}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Name of Authorized Signatory"
                                        id="nameOfAS"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.nameOfAS}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Signature"
                                        id="signature"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.signature}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>

                                </GridItem>
                                {!isNew && <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Remark"
                                        id="remark"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.remark}

                                    />
                                </GridItem>}
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            {isNew ? <Button color="primary" onClick={handleClickOpen}>Submit</Button>
                                : isSubmitted ? <CircularProgress /> : <Button color="primary" onClick={handleUpdate}>Update</Button>}

                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Enter password to secure your document"}</DialogTitle>
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
                    {isSubmitted ?
                        <CircularProgress /> :
                        <div>
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={submitDocument} color="primary" autoFocus>
                                Submit
          </Button>
                        </div>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};


const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors
});

export default connect(mapStateToProps, { addNewDoc, updateDoc })(withStyles(styles, customInputStyle)(PackingList));
