import React, {useState, Suspense} from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PublishIcon from '@material-ui/icons/Publish';
import CustomTabs from "components/CustomTabs/CustomTabs";

const ViewCertifications = React.lazy(() => import("views/Claims&Certifications/ViewCertifications"));
const PublishCertificate = React.lazy(() => import("views/Claims&Certifications/PublishCertificate"));
import { connect } from 'react-redux';

import CustomLoader from "components/Loaders/CustomLoader";
const Certifications = (props) => {

  return (
    <CustomTabs
      variant="fullWidth"
      title="Partnerships:"
      headerColor="primary"
      tabs={[
        {
          tabName: "Publish a certificate",
          tabIcon: PublishIcon,
          tabContent: (
            <PublishCertificate/>
          )
        },
        {
          tabName: "View certificates",
          tabIcon: PublishIcon,
          tabContent: (
            <Suspense fallback = {<CustomLoader/>}>
              <ViewCertifications/>
            </Suspense>
          )
        },
        {
          tabName: "Submit for platform verification",
          tabIcon: PublishIcon,
          tabContent: (
            <>
            </>
          )
        },
      ]}
      />
  );
}

export default Certifications;
