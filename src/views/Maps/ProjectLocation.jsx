import React, {useState, useEffect} from "react";
import Maps from "./Maps.jsx";
import web3 from '../../web3';
// import {registryABI, registryAddress} from 'utils';
import { connect } from 'react-redux';
import LocationFormModal from "views/LocationFormModal";
import {registryContract} from 'registryContract';
// const registryContract = new web3.eth.Contract(registryABI, registryAddress);

const ProjectLocation = props => {

  const [projectLocations, setProjectLocation] = useState([]);
  const [center, setCenter] = useState({});

  useEffect(() => {
    registryContract.methods.getProjectLocations("1").call({
      from : "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
    }).then(res => {
      let locations = [];
      let latitudeSum =0, longitudeSum = 0;
      console.log(res);
      res.forEach(location => {
        locations.push(
          {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude)
          }
        )
        latitudeSum+=parseFloat(location.latitude);
        longitudeSum+=parseFloat(location.longitude);
      })
      let center = {
        lat: latitudeSum/res.length,
        lng: longitudeSum/res.length
      };
      setCenter(center)
      console.log("latitudeSum", latitudeSum, center);
      setProjectLocation(locations);
    })
  }, []);
  return (
    <div>
    { projectLocations.length ?
      <Maps
        markerList={projectLocations}
        center={center}

      /> : "Fetching..."
    }
    </div>

  )

}

export default ProjectLocation;
