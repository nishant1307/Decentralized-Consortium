import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import Card from "components/Card/Card.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { docContract, docAddress } from 'DocContract'
import { partnerContract, partnerAddress } from 'partnersContract';
import { registryContract } from "registryContract";
import MaterialTable from "material-table";
import { CircularProgress } from '@material-ui/core';
import Button from "components/CustomButtons/Button.jsx";
import web3 from '../../web3';
import CustomTabs from "components/CustomTabs/CustomTabs";
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

function useForceUpdate() {
    const [value, set] = useState(true); //boolean state
    return () => set(value => !value); // toggle the state to force render
}


const Projects = (props) => {
    const roleCategory = [
        "Select Role",
        "Agent",
        "Bank",
        "Brand",
        "Buyer",
        "Certification Agency",
        "Consumer",
        "Customs / Authorities",
        "Distributor",
        "Environmental Health & Safety",
        "Facility Maintenance",
        "Field Services",
        "Government",
        "Hardware Integrator",
        "Human Resources",
        "Infrastructure",
        "Insurance",
        "Logistics",
        "Logistics - 3PL",
        "Logistics - Intermodal",
        "Logistics - Ocean Carriers",
        "Maintenance",
        "Marketing",
        "Material Supplier",
        "Municipal / Local Body",
        "Ports / Terminals",
        "Power / Energy",
        "Procurement & Sourcing",
        "Product Development",
        "Production - Manufacturing",
        "Production - Natural Resources",
        "Quality Assurance",
        "Real Estate / Property Management",
        "Recycling",
        "Research & Development",
        "Seller",
        "Software Integrator",
        "Telecom",
        "Traffic Management",
        "Transportation",
        "Utility",
        "Warehouse Management",
        "Warehousing",
        "Waste Management"
    ]
    // console.log(props.rowData);
    const [loader, setLoader] = useState(true);
    const [fetchedData, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const forceUpdate = useForceUpdate();
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        let tempData = []
        docContract.methods.getReviewersList(props.rowData.tokenId).call().then(async res => {
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                let temp1 = {}
                temp1["address"] = element;
                docContract.methods.getReviewStatusForIndividual(props.rowData.tokenId).call({ from: element }).then(fetchedStatus => {
                    console.log(fetchedStatus, "fetchedStatus");
                    temp1["status"] = fetchedStatus
                    tempData.push(temp1);
                    setData(tempData);
                    setLoader(false);
                    forceUpdate();
                })
            }
            if (props.rowData.projectId !== "Unassigned") {
                registryContract.methods.getConsortiumMembers(props.rowData.projectId).call({
                    from: props.auth.user.publicKey
                }).then(res => {
                    for (let index = 0; index < res.length; index++) {
                        const partner = res[index];
                        if (partner.publicKey !== props.user.user[0]) {
                            tempData.forEach(preKey => {
                                if (preKey !== partner.publicKey) {
                                    partnerContract.methods.getPartnerRole(props.rowData.projectId, partner.publicKey).call({
                                        from: props.auth.user.publicKey
                                    }).then(role => {
                                        let temp = parseInt(role);
                                        partner.role = temp === 0 ? "Role Unassigned" : roleCategory[parseInt(role)]
                                        setPartners(partners => [
                                            ...partners,
                                            partner
                                        ])
                                    })
                                }
                            })
                        }
                    }
                })
            }
            setLoader(false);
        })
    }, []);

    function addReviewers() {
        docContract.methods.ownerOf(props.rowData.tokenId).call().then(async ownerAddress => {
            if (ownerAddress === props.user.user[0]) {
                console.log("owner");
                let addressArray = []
                for (let index = 0; index < fetchedData.length; index++) {
                    addressArray.push(fetchedData[index].address)
                }
                let privateKey = await sessionStorage.getItem('privateKey');
                var transaction = {
                    "to": docAddress,
                    "data": docContract.methods.addReviewers(
                        props.rowData.tokenId,
                        addressArray
                    ).encodeABI()
                };
                transaction["gasLimit"] = 4700000;
                web3.eth.accounts.signTransaction(transaction, privateKey)
                    .then(res => {
                        web3.eth.sendSignedTransaction(res.rawTransaction)
                            .on('receipt', async function (receipt) {
                                window.location.reload();
                            })
                    })
            }
        })

    }




    const { classes } = props;

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Project Id"
                        id="first-name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        value={props.rowData.projectId}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Token Id"
                        id="last-name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        value={props.rowData.tokenId}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    {props.rowData.projectId !== "Unassigned" && <CustomTabs
                        // title="Project:"
                        variant="fullWidth"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Reviewers status",
                                tabIcon: YoutubeSearchedForIcon,
                                tabContent: (
                                    <>
                                        {/* <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}> */}
                                        <Card plain>
                                            {loader ?
                                                <React.Fragment>
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                </React.Fragment> :
                                                <>

                                                    <MaterialTable
                                                        columns={[
                                                            { title: "Address", field: "address" },
                                                            {
                                                                title: "Status", field: "status", render: rowData => {
                                                                    return (rowData.status ? <DoneAllIcon /> : <HourglassEmptyIcon />)
                                                                }
                                                            }
                                                        ]}
                                                        data={fetchedData}
                                                        title=""
                                                        options={{
                                                            search: true,
                                                            exportButton: true
                                                        }}
                                                    />
                                                </>}
                                        </Card>
                                        {/* </GridItem> */}
                                        {/* </GridContainer> */}
                                    </>
                                )
                            },
                            {
                                tabName: "Add Reviewer",
                                tabIcon: PersonAddIcon,
                                tabContent: (
                                    <>
                                        {/* <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}> */}
                                        <Card plain>
                                            {loader ?
                                                <React.Fragment>
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                    <Skeleton width="60%" />
                                                    <Skeleton width="100%" />
                                                </React.Fragment> :
                                                <>
                                                    {props.rowData.projectId !== "Unassigned" ? <MaterialTable
                                                        columns={[
                                                            { title: "Email", field: "email" },
                                                            // { title: "PublicKey", field: "publicKey" },
                                                            { title: "OrganizationID", field: "organizationID" },
                                                            // { title: "Role in Consortium", field: "role" },
                                                        ]}
                                                        data={partners}
                                                        title="List of all current participants"
                                                        options={{
                                                            search: true,
                                                            exportButton: true,
                                                            selection: true
                                                        }}
                                                        actions={[
                                                            {
                                                                tooltip: "Add Selected Users To Reviewer's list",
                                                                icon: 'link',
                                                                onClick: (evt, data) => {
                                                                    console.log(data);
                                                                }
                                                            }
                                                        ]}
                                                    /> : <> <MaterialTable
                                                        columns={[
                                                            { title: "Address", field: "address" },
                                                            { title: "Status", field: "status", editable: 'never' },
                                                        ]}
                                                        data={fetchedData}
                                                        title=""
                                                        options={{
                                                            search: true,
                                                            exportButton: true
                                                        }}
                                                        editable={{
                                                            onRowAdd: newData =>
                                                                new Promise((resolve, reject) => {
                                                                    setTimeout(() => {
                                                                        {
                                                                            const data = fetchedData;
                                                                            data.push(newData);
                                                                            setData(data);
                                                                            forceUpdate();
                                                                        }
                                                                        resolve()
                                                                    }, 1000)
                                                                }),
                                                            onRowUpdate: (newData, oldData) =>
                                                                new Promise((resolve, reject) => {
                                                                    setTimeout(() => {
                                                                        {
                                                                            const data = fetchedData;
                                                                            const index = data.indexOf(oldData);
                                                                            data[index] = newData;
                                                                            setData(data);
                                                                            forceUpdate();
                                                                        }
                                                                        resolve()
                                                                    }, 1000)
                                                                }),
                                                            onRowDelete: oldData =>
                                                                new Promise((resolve, reject) => {
                                                                    setTimeout(() => {
                                                                        {
                                                                            let data = fetchedData;
                                                                            const index = data.indexOf(oldData);
                                                                            data.splice(index, 1);
                                                                            setData(data);
                                                                            forceUpdate();
                                                                        }
                                                                        resolve()
                                                                    }, 1000)
                                                                }),
                                                        }}
                                                    />
                                                            <>
                                                                {isLoading ? <CircularProgress /> : <Button variant="contained" color="primary" onClick={() => addReviewers()}>Accept Invite</Button>}
                                                            </>
                                                        </>
                                                    }
                                                </>}
                                        </Card>
                                        {/* </GridItem> */}
                                        {/* </GridContainer> */}
                                    </>
                                )
                            }
                        ]} />}
                </GridItem>
            </GridContainer>
        </div>
    );
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})
export default connect(mapStateToProps, {})(withStyles(dashboardStyle)(Projects));
