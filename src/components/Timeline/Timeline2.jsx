import React, {useState, useEffect} from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import 'react-vertical-timeline-component/style.min.css';
import Divider from '@material-ui/core/Divider';
import Add from "@material-ui/icons/Add";
import {Link} from "react-router-dom";
import moment from "moment";
import {registryContract} from "registryContract";
import web3 from "../../web3";

const TimelineComponent = (props) => {

  const [journey, setJourney] = useState([]);

  useEffect(()=> {
    registryContract.getPastEvents("allEvents", {
      fromBlock: 0,
      topics: [null, props.match.params.projectID]
    })
    .then(events => {
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
      case "0": return "buyer";
      case "1": return "seller";
      case "2": return "logistics";
      case "3": return "agent";
      case "4": return "bank";
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
            <b>{key}:</b> {key=="partnerRole"? fetchPartnerRoleFromCode(event.returnValues[key]) : event.returnValues[key]}
          </p>
        )
      }
    }
    // returnValuesRender = returnValuesRender.slice(returnValuesRender.length/2, returnValuesRender.length)
    // let by = await fetchOrgFromAddress(event.returnValues["_by"]);

    timelineRender.push(
      <VerticalTimelineElement
        key={Math.random()}
        date={time}
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<Add />}
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
      </VerticalTimelineElement>
    )
  })

  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<Add />}
      >
        <h3 className="vertical-timeline-element-title">Creative Director</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project Management, Team Leading
        </p>
      </VerticalTimelineElement>
      {timelineRender}
    </VerticalTimeline>
  )
}

export default TimelineComponent;
