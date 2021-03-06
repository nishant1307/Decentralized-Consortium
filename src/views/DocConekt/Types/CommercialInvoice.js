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
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import MaterialTable, { MTableToolbar } from 'material-table';
import { country, currency, currencyCode } from 'assets/data/countryList'
import { seaPorts } from 'assets/data/seaPort'
import { connect } from 'react-redux';
import { encryptMessage, decryptMessage } from 'utils'
import { addNewDoc, updateDoc } from 'actions/userActions';
import ipfs from '../../../ipfs';
import { registryContract } from "registryContract";
import { partnerContract } from 'partnersContract';
import AssignProject from "views/Products/AssignProject";


import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@material-ui/core';
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

const CommercialInvoice = props => {
    const { classes } = props;
    // const [selectedDate, handleDateChange] = useState(new Date());
    const [struture, setStruture] = useState({});
    // const [mod, setMod] = React.useState("Air");
    // const [tos, setTos] = React.useState('LCL (CY)')
    const [password, setPassword] = useState("");
    const [isNew, setIsNew] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [maintable, setMainTable] = React.useState({
        columns: [
            { title: 'Product Code', field: 'productCode' },
            { title: 'Description of Goods', field: 'descriptionOfGoods' },
            { title: 'HS Code', field: 'HSCode' },
            { title: 'Unit Quantity', field: 'unitQuantity' },
            { title: 'Unit Type', field: 'unitType' },
            { title: 'Price', field: 'price' },
            { title: 'Amount', field: 'amount' },
        ],
        data: [

        ],
    });

    const [partnersListRender, setPartnersListRender] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    function fetchPartners(projectId) {
        registryContract.methods.getConsortiumMembers(projectId).call({
            from: props.auth.user.publicKey
        }).then(res => {
            res.forEach(partner => {
                partnerContract.methods.getPartnerRole(projectId, partner.publicKey).call({
                    from: props.auth.user.publicKey
                }).then(role => {
                    partner.role = role === "" ? "Role Unassigned" : role
                    setPartnersListRender(partnersListRender => [
                        ...partnersListRender,
                        <MenuItem key={Math.random()} name={role} value={role + " " + partner.organizationID}>{role} | {partner.organizationID}</MenuItem>
                    ]);
                })
            })
        })
    }

    async function handleUpdate() {
        setIsSubmitted(true)
        let privateKey = await sessionStorage.getItem('privateKey');
        let password = await decryptMessage(props.data.password, privateKey)
        const content = Ipfs.Buffer.from(JSON.stringify({ formData: struture, tableData: maintable.data }))
        const cid = await ipfs.add(content);
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash, "DocType": "Shipping", "subDocType": "Commercial Invoice", "type": "structured" }), password)
        props.updateDoc(encryptData, props.data.tokenId, struture.remark);
        setIsSubmitted(false)
        props.history.push("/dashboard/home")
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
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash, "DocType": "Shipping", "subDocType": "Commercial Invoice", "type": "structured" }), password)
        let encryptedPassword = await encryptMessage(password, privateKey)
        // console.log(encryptData, encryptedPassword);
        setIsSubmitted(false);
        setOpen(false);
        setStruture({});
        setMainTable({
            columns: [
                { title: 'Product Code', field: 'productCode' },
                { title: 'Description of Goods', field: 'descriptionOfGoods' },
                { title: 'Unit Quantity', field: 'unitQuantity', type: 'numeric' },
                { title: 'Unit Type', field: 'unitType' },
                { title: 'Price', field: 'price', type: 'numeric' },
                {
                    title: 'Amount', field: 'amount', type: 'numeric', readonly: true, render: rowData => {
                        return rowData.unitQuantity * rowData.price
                    }
                },
            ],
            data: [

            ],
        });
        props.addNewDoc({ encryptData: encryptData, encryptedPassword: encryptedPassword, projectID: selectedProject });
        props.history.push("/dashboard/home")

    }


    const handleChangeValue = e => {
        const { id, value } = e.target;
        // console.log(id, value);

        setStruture({ ...struture, [id]: value })
    }


    useEffect(() => {
        let temp = 0;
        for (let index = 0; index < maintable.data.length; index++) {
            temp = temp + parseInt(maintable.data[index].price) * parseInt(maintable.data[index].unitQuantity)

        }
        setStruture({ ...struture, consignmentTotal: temp })
    }, [maintable])



    useEffect(() => {
        if (props.data.hash !== undefined) {
            setIsNew(false);
            ipfs.get(props.data.hash, function (err, files) {
                console.log(JSON.parse(files[0].content.toString('utf8')));
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
                            <h4 className={classes.cardTitleWhite}>Commercial Invoice</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            {isNew &&
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <AssignProject userPublicKey={props.auth.user.publicKey} onSelectProject={(e) => {
                                            fetchPartners(e.target.value);
                                            setSelectedProject(e.target.value);
                                        }}
                                            selectedProject={selectedProject}
                                        />
                                    </GridItem>
                                </GridContainer>
                            }
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Exporter"
                                        id="exporter"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.exporter}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
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
                                <GridItem xs={12} sm={12} md={3} style={{ marginTop: 27 }}>
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
                                <GridItem xs={12} sm={12} md={2}>
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
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
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
                                <GridItem xs={12} sm={12} md={3}>
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
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Consignee"
                                        id="consignee"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.consignee}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} >
                                    {selectedProject === null ? <CustomInput
                                        labelText="Buyer (If not Consignee)"
                                        id="buyer"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.buyer}

                                    /> :
                                        <FormControl className={"CustomInput-formControl-197"} style={{ marginTop: 27 }}  > <InputLabel htmlFor="age-helper">Buyer (If not Consignee)</InputLabel>
                                            <Select
                                                style={{ width: 250 }}
                                                value={struture.buyer}
                                                onChange={(e) => setStruture({ ...struture, ["buyer"]: e.target.value })}
                                            >
                                                {partnersListRender}
                                            </Select>   </FormControl>}
                                </GridItem>
                            </GridContainer>
                            <GridContainer style={{ marginTop: 27 }}>
                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Method of Dispatch</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.mod}
                                            onChange={(e) => setStruture({ ...struture, ["mod"]: e.target.value })}
                                        >
                                            <MenuItem value={"Air"}>Air</MenuItem>
                                            <MenuItem value={"Sea"}>Sea</MenuItem>
                                            <MenuItem value={"Courier"}>Courier</MenuItem>
                                            <MenuItem value={"Road"}>Road</MenuItem>
                                            <MenuItem value={"Rail"}>Rail</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
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
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Vessel / Aircraft"
                                        id="vesselOrAircraft"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.vesselOrAircraft}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
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
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Terms / Method of Payment"
                                        id="Mop"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.Mop}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4} style={{ marginTop: 27 }}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Port of Loading</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.portofLoading === undefined ? null : struture.portofLoading}
                                            onChange={(e) => setStruture({ ...struture, ["portofLoading"]: e.target.value })}
                                        >
                                            {
                                                seaPorts.map((value, index) => {
                                                    return (<MenuItem key={index} value={value.Port}>{value.Country} | {value.Port}</MenuItem>)
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3} style={{ marginTop: 27 }}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={"CustomInput-formControl-197"}
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Date of Departure"
                                            format="MM/dd/yyyy"
                                            value={struture.dateofDeparture}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setStruture({ ...struture, ["dateofDeparture"]: date })}
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3} style={{ marginTop: 27 }}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel htmlFor="age-helper">Port of Discharge</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.portofDischarge === undefined ? null : struture.portofDischarge}
                                            onChange={(e) => setStruture({ ...struture, ["portofDischarge"]: e.target.value })}
                                        >
                                            {
                                                seaPorts.map((value, index) => {
                                                    return (<MenuItem key={index} value={value.Port}>{value.Country} | {value.Port}</MenuItem>)
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </GridItem>
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
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Marine Cover Policy No"
                                        id="marineCoverPolicyNo"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.marineCoverPolicyNo}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Letter Of Credit No"
                                        id="letterOfCreditNo"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.letterOfCreditNo}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <MaterialTable
                                        style={{ margin: '30px 0 0 0' }}
                                        title=""
                                        columns={[
                                            { title: 'Product Code', field: 'productCode' },
                                            { title: 'Description of Goods', field: 'descriptionOfGoods' },
                                            { title: 'Unit Quantity', field: 'unitQuantity', type: 'numeric' },
                                            { title: 'Unit Type', field: 'unitType' },
                                            { title: 'Price', field: 'price', type: 'numeric' },
                                            {
                                                title: 'Amount', field: 'amount', type: 'numeric', readonly: true, render: rowData => {
                                                    return rowData.unitQuantity * rowData.price
                                                }
                                            },
                                        ]}
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
                                        value={struture.additionalInformation}

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
                                        value={struture.additionalChargesDiscounts}

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
                                        value={struture.consignmentTotal}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4} style={{ marginTop: 27 }}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel style={{ width: 250 }} htmlFor="age-helper">Shipping Terms</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.shippingTerms}
                                            onChange={(e) => setStruture({ ...struture, ["shippingTerms"]: e.target.value })}
                                        >
                                            <MenuItem value={"EXW"}>EXW</MenuItem>
                                            <MenuItem value={"FCA"}>FCA</MenuItem>
                                            <MenuItem value={"FAS"}>FAS</MenuItem>
                                            <MenuItem value={"FOB"}>FOB</MenuItem>
                                            <MenuItem value={"CFR"}>CFR</MenuItem>
                                            <MenuItem value={"CIF"}>CIF</MenuItem>
                                            <MenuItem value={"CPT"}>CPT</MenuItem>
                                            <MenuItem value={"CIP"}>CIP</MenuItem>
                                            <MenuItem value={"DAT"}>DAT</MenuItem>
                                            <MenuItem value={"DAP"}>DAP</MenuItem>
                                            <MenuItem value={"DDP"}>DDP</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Invoice Total"
                                                id="invoiceTotal"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                onChangeValue={handleChangeValue}
                                                value={struture.invoiceTotal}

                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6} style={{ marginTop: 27 }}>
                                            <FormControl className={"CustomInput-formControl-197"}  >
                                                <InputLabel htmlFor="age-helper">Currency</InputLabel>
                                                <Select
                                                    style={{ width: 150 }}
                                                    value={struture.currencyType}
                                                    onChange={(e) => setStruture({ ...struture, ["currencyType"]: e.target.value })}
                                                >
                                                    {
                                                        currency.map((value, index) => {
                                                            return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                                                        })
                                                    }

                                                </Select>
                                            </FormControl>
                                        </GridItem>
                                    </GridContainer>
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
                                        value={struture.placeOfIssue}


                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3} style={{ marginTop: 27 }}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={"CustomInput-formControl-197"}
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Date of Issue"
                                            format="MM/dd/yyyy"
                                            value={struture.dateOfIssue}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setStruture({ ...struture, ["dateOfIssue"]: date })}
                                        />
                                    </MuiPickersUtilsProvider>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Bank Details"
                                            id="bankDetails"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChangeValue={handleChangeValue}
                                            value={struture.bankDetails}

                                        />
                                    </GridItem>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Signatory Company"
                                        id="signatoryCompany"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        value={struture.signatoryCompany}
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
                                        value={struture.nameOfAS}

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
                            <Button onClick={handleClose} variant="contained" color="primary" >
                                Cancel
          </Button>
                            <Button onClick={submitDocument} variant="contained" color="primary" autoFocus>
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
    auth: state.auth,
    user: state.user,
    errors: state.errors
});

export default connect(mapStateToProps, { addNewDoc, updateDoc })(withStyles(styles, customInputStyle)(CommercialInvoice));
