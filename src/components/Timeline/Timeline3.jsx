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
      <TimelineItem
        key={Math.random()}
        dateText={time}
        style={{ color: '#e86971' }}
        dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
        bodyContainerStyle={timelineRender%2==0 ? {
          background: '#ddd',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
        }: {}}
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
  <TimelineItem
    key="001"
    dateText="11/2010 – Present"
    style={{ color: '#e86971' }}
  >
    <h3>Title, Company</h3>
    <h4>Subtitle</h4>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
  </TimelineItem>
  <TimelineItem
    key="002"
    dateText="04/2009 – 11/2010"
    dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
    bodyContainerStyle={{
      background: '#ddd',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
    }}
  >
    <h3 style={{ color: '#61b8ff' }}>Title, Company</h3>
    <h4 style={{ color: '#61b8ff' }}>Subtitle</h4>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
  </TimelineItem>
  <TimelineItem
    key="003"
    dateComponent={(
      <div
        style={{
          display: 'block',
          float: 'left',
          padding: '10px',
          background: 'rgb(150, 150, 150)',
          color: '#fff',
        }}
      >
        11/2008 – 04/2009
      </div>
    )}
  >
    <h3>Title, Company</h3>
    <h4>Subtitle</h4>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
  </TimelineItem>
  <TimelineItem
    key="004"
    dateText="08/2008 – 11/2008"
    dateInnerStyle={{ background: '#76bb7f' }}
  >
    <h3>Title, Company</h3>
    <h4>Subtitle</h4>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
    <p>
      Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
      exercitation. Veniam velit adipisicing anim excepteur nostrud magna
      nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
      reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
      est.
    </p>
  </TimelineItem>
</Timeline>
  )
}

export default TimelineComponent;
