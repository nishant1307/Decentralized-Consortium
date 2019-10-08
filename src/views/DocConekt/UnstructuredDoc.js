import React, { useState } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { connect } from 'react-redux';
import { addReview } from 'actions/userActions';
import CustomLoader from "components/Loaders/CustomLoader";
import { withStyles } from '@material-ui/core/styles';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Select,
    MenuItem
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


const UnstructuredDoc = props => {
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [review, setReview] = React.useState(true);
    const classes = useStyles();
    // console.log(props.location.state.data);
    const url = "https://gateway.arthanium.org/ipfs/" + props.location.state.data.hash;

    function handleReview() {
        console.log(review)
        setLoader(true);
        props.addReview(props.location.state.tokenId, review);
    }
    return (
        <>
            {loader && <CustomLoader />}
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 >
                                {props.location.state.tokenId}  &nbsp;<ArrowForwardIosIcon />&nbsp;{props.location.state.data.DocType}&nbsp;<ArrowForwardIosIcon />&nbsp;{props.location.state.data.subDocType}
                            </h4>
                        </CardHeader>
                        <CardBody >
                            <iframe onClick={() => {
                                window.open(url, "_blank")
                            }} src={url} height="700" width="1000"></iframe>
                        </CardBody>
                    </Card>
                    {props.location.state.data.reviewStatus && <Fab variant="extended" aria-label="delete" className={classes.fab} onClick={() => setOpen(true)}>
                        <RateReviewIcon className={classes.extendedIcon} />
                        Add Review
                        </Fab>}
                </GridItem>
            </GridContainer>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Select your review"}</DialogTitle>
                <DialogContent>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Select
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                inputProps={{
                                    name: 'review',
                                }}
                                fullWidth
                            >
                                <MenuItem key={Math.random()} value={true}>TRUE</MenuItem>
                                <MenuItem key={Math.random()} value={false}>FALSE</MenuItem>
                            </Select>
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
            </Button>
                    <Button onClick={() => handleReview()} color="primary" autoFocus>
                        Submit
            </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps, { addReview })(withStyles(dashboardStyle)(UnstructuredDoc));

