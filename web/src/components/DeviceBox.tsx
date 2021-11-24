import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'
import DevicesManagement from './DevicesManagement'
import { RiSettings2Line } from "react-icons/ri"
import { Link } from 'react-router-dom'

const DeviceBox = (props) => {

  return (
    <Card
        bg={props.state}
        text='white'
        style={{ width: '18rem' }}
        className="m-2"
      >
        <Link to={"/Details/" + props.id} style={{ textDecoration: 'none'}} >
        <Card.Body>
          <Card.Title>{props.img}{props.name}</Card.Title>
          <Card.Text>
            {props.ipAddress}
          </Card.Text>
        </Card.Body>
        </Link>
        <Card.Footer className="text-center">
          <DevicesManagement name={props.name} ipAddress={props.ipAddress} id={props.id} groupId={props.groupId} type={props.type} displayDevice={props.displayDevice} buttonFeature={<RiSettings2Line/> } fetchMethod={"PUT"}/>
        </Card.Footer>
      </Card>
  );
};

export default DeviceBox;