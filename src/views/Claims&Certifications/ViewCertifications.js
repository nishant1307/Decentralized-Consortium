import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import { certificationContract, certificationAddress } from 'certificationContract';

const ViewCertifications = () => {
  const [certificationList, setCertificationList] = useState([]);
  const [loading, setLoading] = useState(false);

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
          setCertificationList(certificationList => [
            ...certificationList,
            details
          ])
          console.log(details);
        })
      })
    })
  }, []);


  return (
    <MaterialTable
      columns={[
        { title: "Certification ID", field: "certificateID" },
        { title: "Certification Claim", field: "title" },
        { title: "Certification Claim", field: "type" },
        { title: "Certification Claim", field: "properties.name" },
        { title: "Certificate Image", render: rowData => <img src={"https://gateway.arthanium.org/ipfs/"+rowData.properties.image} height="50px" width="50px"/>}

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
    />
  )
};

export default ViewCertifications;
