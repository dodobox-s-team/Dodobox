import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'
import DeviceSettings from './DeviceSettings'

const DeviceBox = (props) => {

  return (
    <Card
        bg={props.state}
        text='white'
        style={{ width: '18rem' }}
        className="m-2"
      >
        <a href={"/Details/" + props.id} style={{ textDecoration: 'none'}} >
        <Card.Body>
          <Card.Title>{props.img}{props.name}</Card.Title>
          <Card.Text>
            {props.ipAddress}
          </Card.Text>
        </Card.Body>
        </a>
        <Card.Footer className="text-center">
          <DeviceSettings name={props.name} ipAddress={props.ipAddress} id={props.id} groupId={props.groupId} type={props.type} displayDevice={props.displayDevice}/>
        </Card.Footer>
      </Card>
  );
};

export default DeviceBox;