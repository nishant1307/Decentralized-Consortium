import React from "react";
const PurchaseOrder = React.lazy(() => import('./Types/PurchaseOrder'));
const CommercialInvoice = React.lazy(() => import('./Types/CommercialInvoice'));
const PackingList = React.lazy(() => import('./Types/PackingList'));
const SeawayBill = React.lazy(() => import('./Types/SeawayBill'));
const ShippingInstructions = React.lazy(() => import('./Types/ShippingInstructions'));
const UserProfile = props => {
    // console.log(props.location.state.projectID, "pros");

    function getPage() {
        switch (props.match.params.structuredDocId) {
            case "Purchase Order":
                return <PurchaseOrder data={props.location.state} />;
            case "Commercial Invoice":
                return <CommercialInvoice data={props.location.state} />;
            case "Packing List":
                return <PackingList data={props.location.state}/>
            case "Seaway Airway Bill":
                return <SeawayBill data={props.location.state} />
            case "Shipping Instruction":
                return <ShippingInstructions data={props.location.state} />
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <div>
            {
                getPage()
            }
        </div>
    );
};

export default UserProfile;
