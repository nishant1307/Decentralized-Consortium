import React, {useState, useEffect} from "react";
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import {Link} from "react-router-dom";
import moment from "moment";
import {registryContract} from "registryContract";
import web3 from "../../web3";
import { Divider } from '@material-ui/core';

const TimelineComponent = (props) => {

  const [journey, setJourney] = useState([]);

  useEffect(()=> {
    registryContract.getPastEvents("allEvents", {
      fromBlock: 0,
      topics: [null, props.match.params.projectID]
    })
    .then(events => {
      console.log(events);
      setJourney(events);
    })
  }, []);

  const fetchOrgFromAddress = async (address) => {
    const orgDetails = await registryContract.methods.getOrganizationDetails().call({
      from: address
    });
    return orgDetails.name;
  }

  const fetchPartnerRoleFromCode = (code) => {
    switch(code) {
      case "1": return "buyer";
      case "2": return "seller";
      case "3": return "logistics";
      case "4": return "agent";
      case "5": return "bank";
    }
  }

  let timelineRender = [];
  journey.forEach(event => {
    let time = moment(event.returnValues['timestamp']*1000).format("DD-MM-YYYY h:mm:ss");
    let returnValuesRender = [];
    for(let key in event.returnValues) {
      if(key!="_by" && key!="timestamp" && key!="_projectID" && isNaN(parseInt(key))){
        returnValuesRender.push (
          <p style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            key={Math.random()}
          >
            <b>{key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}:</b> {key=="partnerRole"? fetchPartnerRoleFromCode(event.returnValues[key]) : event.returnValues[key]}
          </p>
        )
      }
    }
    // returnValuesRender = returnValuesRender.slice(returnValuesRender.length/2, returnValuesRender.length)
    // let by = await fetchOrgFromAddress(event.returnValues["_by"]);

    timelineRender.push(
      <TimelineItem
        key={Math.random()}
        dateText={time}
        style={{ color: '#e86971' }}
        dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
        bodyContainerStyle={timelineRender.length%2==0 ? {
          background: '#ddd',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
        }: {
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <b><h4>{event.event}</h4>
        <p>By: {event.returnValues["_by"]}</p></b>
        <Divider/><br/>
        {returnValuesRender}
        <Divider/>
        <p style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}><br/>
          <b>Blockchain Details:</b> <br />
          <Link to={"/" + event.transactionHash}>View in Blockchain Explorer</Link><br />
        </p>
      </TimelineItem>
    )
  })

  return (
    <Timeline lineColor={'#ddd'}>
      {journey ? timelineRender: "Fetching Product Journey. Please wait..."}
    </Timeline>
  )
}

export default TimelineComponent;
