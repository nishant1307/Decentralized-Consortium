import React from "react";
import { Link } from "react-router-dom";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DescriptionIcon from '@material-ui/icons/Description';
import Modal from '../../components/CustomModal/Modal'
const Modules = props => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen)

    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                    <Link to="/dashboard/modules/certifications">
                        <Card onClick={toggleModal}>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <CardMembershipIcon />
                                </CardIcon>
                            </CardHeader>
                            <CardFooter stats>
                                <div >
                                    Certification
                            </div>
                            </CardFooter>
                        </Card>
                    </Link>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <Link to={{
                        pathname: "/dashboard/modules/shipping",
                        state: { documentType: "Shipping" }
                    }} >
                        <Card onClick={toggleModal}>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <LocalShippingIcon />
                                </CardIcon>
                            </CardHeader>
                            <CardFooter stats>
                                <div >
                                    Shipment Manager
              </div>
                            </CardFooter>
                        </Card>
                        </Link>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <Link to={{
                        pathname: "/dashboard/documentsByType/sales",
                        state: { documentType: "Sales" }
                    }} >
                        <Card onClick={toggleModal}>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <TrendingUpIcon />
                                </CardIcon>
                            </CardHeader>
                            <CardFooter stats>
                                <div >
                                    Sales
              </div>
                            </CardFooter>
                        </Card>
                    </Link>
                </GridItem>
                {/** <GridItem xs={12} sm={4} md={4}>
                    <Card onClick={toggleModal}>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <ReceiptIcon />
                            </CardIcon>
                        </CardHeader>
                        <CardFooter stats>
                            <div >
                                E Letter of Credit
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <Card onClick={toggleModal}>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <DescriptionIcon />
                            </CardIcon>
                        </CardHeader>
                        <CardFooter stats>
                            <div >
                                Invoice Factoring
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <Card onClick={toggleModal}>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <PermIdentityIcon />
                            </CardIcon>
                        </CardHeader>
                        <CardFooter stats>
                            <div >
                                Digital Identity
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                    <Card onClick={toggleModal}>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <FindReplaceIcon />
                            </CardIcon>
                        </CardHeader>
                        <CardFooter stats>
                            <div >
                                Geo Tagging
              </div>
                        </CardFooter>
                    </Card>
                </GridItem> */}
            </GridContainer>
            <Modal
                open={isOpen}
                onClose={toggleModal}
                content={
                    <div>Coming Soon!</div>
                }
            />
        </div>
    );
};

export default Modules;
