import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const UnstructuredDoc = props => {
    console.log(props.location.state.data);
    const url = "https://gateway.arthanium.org/ipfs/" + props.location.state.data.hash;
    return (
        <>
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
                </GridItem>
            </GridContainer>
        </>
    );
};

export default UnstructuredDoc;
