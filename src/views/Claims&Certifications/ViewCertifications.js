import React, {useState, useEffect} from "react";
import MaterialTable, { MTableToolbar }  from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { certificationContract, certificationAddress } from 'certificationContract';
import { SpeedDial } from '@material-ui/lab';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import FilterNoneIcon from '@material-ui/icons/FilterNone';
import PublishIcon from '@material-ui/icons/Publish';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
const useStyles = makeStyles(theme => ({
  exampleWrapper: {
    display: 'inline-block'
  }
}));


const actions = [
  { icon: <PublishIcon />, name: 'Publish new Certificate', goTo: "/dashboard/certifications/publish" },
  { icon: <FilterNoneIcon />, name: 'Template Certificate', goTo: "/dashboard/certifications/template" },
];

const ViewCertifications = (props) => {
  const classes = useStyles();
  const [certificationList, setCertificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("Open", open);
  useEffect(() => {
    certificationContract.methods.getCertificates(localStorage.getItem("address")).call({
      address: localStorage.getItem("address")
    }).then(tokens => {
      console.log(tokens);
      tokens.forEach(tokenID => {
        certificationContract.methods.getCertificateDetails(tokenID).call({
          address: localStorage.getItem("address")
        }).then(certificate => {
          let details = JSON.parse(certificate[0]);
          details.approvedBy = certificate[1];
          details.rejectedBy = certificate[2];
          console.log(certificate);
          setCertificationList(certificationList => [
            ...certificationList,
            details
          ])
        })
      })
    })
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };


  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary" style={{display: "flex"}}>
              <h4 className={classes.cardTitleWhite}>
                My Certificates
              </h4>
              <SpeedDial
            ariaLabel="SpeedDial example"
            icon={<SpeedDialIcon />}
            onClose={()=> {setOpen(false)}}
            onOpen={handleOpen}
            open={open}
            direction={'left'}
            style={{float: "right", width: "90%"}}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {props.history.push(action.goTo)}}
              />
            ))}
          </SpeedDial>
            </CardHeader>
        {loading ?
          <React.Fragment>
                <Skeleton width="100%"/>
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
          </React.Fragment> :
          <MaterialTable
            columns={[
              { title: "Certification ID", field: "certificateID" },
              { title: "Title", field: "title" },
              { title: "Type", field: "type" },
              { title: "Certification Claim", field: "properties.name" },
              { title: "Certificate Image", render: rowData => <img src={"https://gateway.arthanium.org/ipfs/"+rowData.properties.image} height="50px" width="50px"/>},
              { title: "Approval Status", fieldBy: "approvedBy", render: rowData => (rowData.approvedBy.length>0) ? <VerifiedUserIcon/>: <VerifiedUserIcon color="disabled"/>}
            ]}
            data={certificationList}
            title="Certificates"
            options={{
              search: true,
              exportButton: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "No certificates for your organization yet"
              }
            }}
            actions={[
          {
            icon: 'assessment',
            tooltip: 'Apply for approval to Certification Agency(s)',
            onClick: (event, rowData) => alert("Thanks for applying")
          }
        ]}
          />
        }
        </Card>
        </GridItem>
      </GridContainer>
  )
};

export default ViewCertifications;
