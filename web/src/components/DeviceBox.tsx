import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'

const DeviceBox = (props) => {

  return (
    <Card
        bg={props.state}
        text='white'
        style={{ width: '18rem' }}
        className="m-2"
      >
        <Card.Body>
          <Card.Title>{props.img}{props.name}</Card.Title>
          <Card.Text>
            {props.info}
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default DeviceBox;