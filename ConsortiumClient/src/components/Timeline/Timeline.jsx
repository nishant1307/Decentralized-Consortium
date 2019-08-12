import React, {useState, useEffect} from "react";
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import Divider from '@material-ui/core/Divider';
import moment from "moment";
import {registryContract} from "registryContract";
import web3 from "../../web3";

const TimelineComponent = (props) => {

  const [journey, setJourney] = useState([]);

  useEffect(()=> {
    console.log(web3.utils.sha3("ProjectCreated(string,string,address,uint256)"));
    registryContract.getPastEvents('ProjectCreated', {
      filter: {_projectID: web3.utils.sha3(props.match.params.projectID)},
      fromBlock: 0
    })
    .then(events => {
      console.log(events);
      setJourney(events);
    })
  }, []);

  let timelineRender = [];
  journey.forEach(event => {
    let time = moment(event.returnValues['timestamp']*1000).format("DD-MM-YYYY h:mm:ss");
    let returnValuesRender = [];
    for(let key in event.returnValues) {
      returnValuesRender.push(
        <p style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}>
          <b>{key}:</b> {event.returnValues[key]}
        </p>
      )
    }
    returnValuesRender = returnValuesRender.slice(returnValuesRender.length/2, returnValuesRender.length)

    timelineRender.push(
      <TimelineItem
        key="002"
        dateText={time}
        style={{ color: '#e86971' }}
        dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
        bodyContainerStyle={{
          background: '#ddd',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <b><h4>{event.event}</h4>
        <p>By: {event.returnValues["_by"]}</p></b>
        <Divider/><br/>
        {returnValuesRender}
        <p style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}>
        <Divider/><br/>
          <b>Blockchain Details:</b> <br />
          <b>Block Number:</b> {event.blockNumber} <br/>
          <b>Block Hash:</b> {event.blockHash} <br/>
          <b>Tx Hash:</b> {event.transactionHash} <br />
        </p>
      </TimelineItem>
    )
  })

  return (
    <Timeline lineColor={'#ddd'}>
      {timelineRender}
    </Timeline>
  )
}

export default TimelineComponent;
