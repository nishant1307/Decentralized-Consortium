import React from "react";
const PurchaseOrder = React.lazy(() => import('./Types/PurchaseOrder'));
const CommercialInvoice = React.lazy(() => import('./Types/CommercialInvoice'));
const PackingList = React.lazy(() => import('./Types/PackingList'));
const SeawayBill = React.lazy(() => import('./Types/SeawayBill'));
const ShippingInstructions = React.lazy(() => import('./Types/ShippingInstructions'));
const ProformaInvoice = React.lazy(() => import('./Types/ProformaInvoice'));
const UserProfile = props => {
    // console.log(props.location.state.projectID, "pros");

    function getPage() {
        switch (props.match.params.structuredDocId) {
            case "Purchase Order":
                return <PurchaseOrder data={props.location.state} {...props} />;
            case "Commercial Invoice":
                return <CommercialInvoice data={props.location.state}  {...props} />;
            case "Packing List":
                return <PackingList data={props.location.state}  {...props} />
            case "Seaway Airway Bill":
                return <SeawayBill data={props.location.state}  {...props} />
            case "Shipping Instruction":
                return <ShippingInstructions data={props.location.state}  {...props} />
            case "Proforma Invoice":
                return <ProformaInvoice data={props.location.state}  {...props} />
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
