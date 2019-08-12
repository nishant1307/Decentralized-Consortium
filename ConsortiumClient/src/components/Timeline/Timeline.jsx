import React, {useState, useEffect} from "react";
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import moment from "moment";
import {registryContract} from "registryContract";
const TimelineComponent = () => {

  const [journey, setJourney] = useState([]);

  useEffect(()=> {
    registryContract.getPastEvents('allEvents', {
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
        <p>By: {event.address}</p></b>
        {returnValuesRender}
        <p style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}>
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
