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
import { country, currency, currencyCode } from '../../../assets/data/countryList'
import { connect } from 'react-redux';
import { encryptMessage, decryptMessage } from 'utils'
import { addNewDoc, updateDoc } from 'actions/userActions';
import ipfs from '../../../ipfs';

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
import {withStyles} from '@material-ui/core/styles';


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

const ShippingInstructions = props => {
    const { classes } = props;
    const [struture, setStruture] = useState({});
    // const [mod, setMod] = React.useState("Air");
    // const [tos, setTos] = React.useState('LCL (CY)')
    const [password, setPassword] = useState("");
    const [isNew, setIsNew] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    async function handleUpdate() {
        setIsSubmitted(true)
        let privateKey = await sessionStorage.getItem('privateKey');
        let password = await decryptMessage(props.data.password, privateKey)
        const content = Ipfs.Buffer.from(JSON.stringify({ formData: struture }))
        const cid = await ipfs.add(content);
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash, "type": "Shipping Instruction" }), password)
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
        const content = Ipfs.Buffer.from(JSON.stringify({ formData: struture }))
        const cid = await ipfs.add(content);
        let encryptData = await encryptMessage(JSON.stringify({ "hash": cid[0].hash, "type": "Shipping Instruction" }), password)
        let encryptedPassword = await encryptMessage(password, privateKey)
        // console.log(encryptData, encryptedPassword);
        setIsSubmitted(false);
        setOpen(false);
        setStruture({});
        props.addNewDoc({ encryptData: encryptData, encryptedPassword: encryptedPassword, projectID: props.data.projectID });
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
                            <h4 className={classes.cardTitleWhite}>Shipping Instructions</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Shipper"
                                        id="shipper"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.shipper}

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
                                        labelText="Export Declaration Number"
                                        id="exportDeclarationNumber"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.exportDeclarationNumber}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
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
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Carrier"
                                        id="carrier"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.carrier}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Notfy Party (If not Consignee)"
                                        id="notfyParty"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.notfyParty}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
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
                                        labelText="Place of Receipt"
                                        id="placeOfReceipt"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.placeOfReceipt}
                                    />
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
                                        value={struture.portOfLoading}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel style={{ width: 250 }} htmlFor="age-helper">Freight Charges</InputLabel>
                                        <Select
                                            style={{ width: 250 }}
                                            value={struture.freightCharges}
                                            onChange={(e) => setStruture({ ...struture, ["freightCharges"]: e.target.value })}
                                        >
                                            <MenuItem value={"Prepaid"}>Prepaid</MenuItem>
                                            <MenuItem value={"Collect"}>Collect</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Document Instructions"
                                        id="documentInstructions"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.documentInstructions}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Place of Receipt"
                                        id="placeOfReceipt"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.placeOfReceipt}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Port of Discharge"
                                        id="portOfDischarge"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.portOfDischarge}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
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
                                <GridItem xs={12} sm={12} md={2}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <InputLabel style={{ width: 250 }} htmlFor="age-helper">Shipping Terms</InputLabel>
                                        <Select
                                            style={{ width: 150 }}
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
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Place"
                                        id="place"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
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
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Decalared Value"
                                        id="decalaredValue"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.decalaredValue}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Marks and Numbers"
                                        id="marksandNumbers"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.marksandNumbers}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Kind & No of Packages"
                                        id="kindOrNoOfPackages"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.kindOrNoOfPackages}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Description of Goods"
                                        id="descriptionOfGoods"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.descriptionOfGoods}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Gross Weight (kg)"
                                        id="grossWeight"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.grossWeight}

                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Measurements (m³)"
                                        id="measurements"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.measurements}

                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Add Line"
                                        id="addLine"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.addLine}


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
                                <GridItem xs={12} sm={12} md={6}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <h7>Does this shipment contain HAZARDOUS / DANGEROUS goods? If you answered YES, please also enclose your dangerous goods paperwork.</h7>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>

                                                <Select
                                                    style={{ width: 150 }}
                                                    value={struture.HAZARDOUS}
                                                    onChange={(e) => setStruture({ ...struture, ["HAZARDOUS"]: e.target.value })}
                                                >
                                                    <MenuItem value={"Yes"}>Yes</MenuItem>
                                                    <MenuItem value={"No"}>No</MenuItem>

                                                </Select>

                                            </GridItem>
                                        </GridContainer>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <FormControl className={"CustomInput-formControl-197"}  >
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <h7 >Is this shipment on Letter of Credit? If you answered YES, please also enclose your Letter of Credit paperwork.</h7>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <Select
                                                    style={{ width: 150 }}
                                                    value={struture.LOC}
                                                    onChange={(e) => setStruture({ ...struture, ["LOC"]: e.target.value })}
                                                >
                                                    <MenuItem value={"Yes"}>Yes</MenuItem>
                                                    <MenuItem value={"No"}>No</MenuItem>

                                                </Select>
                                            </GridItem>
                                        </GridContainer>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>
                                    <CustomInput
                                        labelText="Special Instructions"
                                        id="specialInstructions"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        onChangeValue={handleChangeValue}
                                        value={struture.specialInstructions}
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
                                        value={struture.signatoryCompany}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
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
                                <GridItem xs={12} sm={12} md={2}>
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
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
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
                                <GridItem xs={12} sm={12} md={6}>

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
                                <GridItem xs={12} sm={12} md={6}>

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

export default connect(mapStateToProps, { addNewDoc, updateDoc })(withStyles(styles, customInputStyle)(ShippingInstructions));
