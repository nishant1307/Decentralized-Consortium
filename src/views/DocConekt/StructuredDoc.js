import React from "react";
const PurchaseOrder = React.lazy(() => import('./Types/PurchaseOrder'));
const CommercialInvoice = React.lazy(() => import('./Types/CommercialInvoice'));
const PackingList = React.lazy(() => import('./Types/PackingList'));
const SeawayBill = React.lazy(() => import('./Types/SeawayBill'));
const ShippingInstructions = React.lazy(() => import('./Types/ShippingInstructions'));
const UserProfile = props => {
    console.log(props, "pros");

    function getPage() {
        switch (props.match.params.structuredDocId) {
            case "Purchase Order":
                return <PurchaseOrder />;
            case "Commercial Invoice":
                return <CommercialInvoice />;
            case "Packing List":
                return <PackingList />
            case "Seaway / Airway Bill":
                return <SeawayBill />
            case "Shipping Instruction":
                return <ShippingInstructions />
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
