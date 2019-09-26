import React, { Suspense, useState, useEffect } from "react";
// nodejs library to set properties for components
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { partnerContract, partnerAddress } from 'partnersContract';
import { registryContract } from 'registryContract';
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import moment from "moment";
import web3 from '../../web3';
import Modal from "components/CustomModal/Modal";
import MaterialTable from "material-table";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

//create your forceUpdate hook
function useForceUpdate(){
    const [value, set] = useState(true); //boolean state
    return () => set(value => !value); // toggle the state to force render
}

const Partners = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [loader, setLoader] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalStatus] = useState(false);
    const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        partnerContract.methods.getAllCategory().call({
            from: "0x66911a74374dF86b19317f9C7F515FC18C5347C2"
        }).then(res => {
            // if (res.length == 0)
            //     setLoader(false);
            // res.forEach(list => {
            setCategoryList(res)
            setLoader(false);
            // });
        });
    }, []);

    useEffect(() => {
        let temp = categoryList;
        for (let index = 0; index < temp.length; index++) {
            registryContract.methods.getOrganizationDetailsByorganizationID(temp[index].organizationID).call().then(res => {
                temp[index].name = res.name;
                setCategoryList(temp)
                setLoader(false);
                forceUpdate();
            })
        }
    }, [categoryList])



    const handleStatusUpdate = (rowData) => async () => {
        setLoading(true);
        setLoader(true)
        let privateKey = await sessionStorage.getItem("privateKey")
        let gasPrice = await web3.eth.getGasPrice();
        var transaction = {
            "to": partnerAddress,
            "data": partnerContract.methods.updateCategory(
                rowData.category,
                true,
                rowData.organizationID
            ).encodeABI(),
            gasPrice: gasPrice
        };
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
            web3.eth.sendSignedTransaction(result.rawTransaction)
                .once('receipt', (receipt) => {
                    if (receipt.status) {
                        let tempData = categoryList;
                        for (var i = 0; i < tempData.length; i++) {
                            if (tempData[i].organizationID === rowData.organizationID && tempData[i].category === rowData.category && tempData[i].documentHash === rowData.documentHash) {
                                tempData[i].status = true;
                                tempData[i].timeStamp = Date.now()
                                break;
                            }
                        }
                        setCategoryList(tempData);
                        setModalStatus(false);
                        setLoading(false);
                        setLoader(false)
                        setSnackbar({ color: "success", open: true, message: "Status Updated" });
                        setTimeout(() => {
                            setSnackbar({ color: "success", open: false, message: "" });
                        }, 30000)
                    }
                })
                .once('error', (error) => {
                    setModalStatus(false);
                    setLoading(false);
                    setLoader(false)
                    setSnackbar({ color: "danger", open: true, message: "Network error Occured! Please try again later." });
                    setTimeout(() => {
                        setSnackbar({ color: "danger", open: false, message: "" });
                    }, 30000)
                })
        })
    }

    const { classes } = props;

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Category List
                            </h4>
                        </CardHeader>
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
                            <MaterialTable
                                columns={[
                                    { title: "Organization Name", field: "name" },
                                    { title: "Organization ID", field: "organizationID" },
                                    { title: "Category", field: "category" },
                                    {
                                        field: 'documentHash',
                                        title: 'Documents',
                                        render: rowData => {
                                            const url = "https://gateway.arthanium.org/ipfs/" + rowData.documentHash;
                                            return (
                                                <>
                                                    <Button onClick={() => setModalStatus(true)} variant="contained" color="primary">View</Button>
                                                    <Modal
                                                        open={isModalOpen}
                                                        onClose={() => setModalStatus(false)}
                                                        title="Documents"
                                                        content={
                                                            <iframe onClick={() => {
                                                                window.open(url, "_blank")
                                                            }} src={url} height="700" width="1000"></iframe>
                                                        }
                                                        action={
                                                            !isLoading ? !rowData.status ? <Button onClick={handleStatusUpdate(rowData)} variant="contained" color="primary">Accept</Button> : <h4><DoneAllIcon /> &nbsp; Already Approved</h4> : <CircularProgress />
                                                        }

                                                    />
                                                </>)
                                        }
                                    },
                                    {
                                        field: 'status',
                                        title: 'Claim Status',
                                        render: rowData => {
                                            return (rowData.status ? <DoneAllIcon /> : <HourglassEmptyIcon />)
                                        }
                                    },
                                    { title: "Approved Since", field: "timeStamp", render: rowData => rowData.timeStamp !== "0" ? moment(rowData.timeStamp * 1000).format("DD-MM-YYYY") : "Yet To Be Approved!" },
                                ]}
                                data={categoryList}
                                title=""
                                options={{
                                    search: true,
                                    exportButton: false,
                                    grouping: true,
                                    paginationType: "stepped",
                                }}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: "No Devices Found!"
                                    }
                                }}
                            />
                        }
                    </Card>
                </GridItem>
            </GridContainer>
            <Snackbar color={snackbar.color} open={snackbar.open} place="br" className={classes.margin} message={snackbar.message} />
        </div>
    );
}




export default (withStyles(dashboardStyle)(Partners));
