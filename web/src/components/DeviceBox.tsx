import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'
import { FaThermometerQuarter } from "react-icons/fa";
import { BsLamp } from "react-icons/bs";

const DeviceBox = (props) => {

  return (
    <Card
        bg={props.state}
        text='white'
        style={{ width: '18rem' }}
        className="m-2"
      >
        <Card.Body>
          <Card.Title><FaThermometerQuarter />{props.name}</Card.Title>
          <Card.Text>
            {props.info}
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default DeviceBox;