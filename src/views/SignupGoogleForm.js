import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
const SignupGoogleForm = () => {
  return(
    <GridContainer>
      <GridItem md={2}/>
    <GridItem xs={12} sm={12} md={8}>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfMqLaz4vvf7saGAAWKIWASVsc5lMFdIKQTaU1CzoehVdNYfw/viewform?embedded=true" width="100%" height="1500" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
    </GridItem>
    <GridItem md={2}/>
    </GridContainer>
  )
}

export default SignupGoogleForm;
