import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import DeviceBox from '../components/DeviceBox.tsx'
import AddDevice from '../components/AddDevice.tsx'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { FaThermometerQuarter } from "react-icons/fa";
import { BsLamp } from "react-icons/bs";

class ListDevices extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			devices: [],
			isLoaded: false
		}
	};
	
	displayDevice () {
		fetch("https://localhost/api/devices", {method: 'GET'})
			.then(devicesElements => devicesElements.json())
			.then((response) => {
				this.setState({
					isLoaded : true,
					devices : response
				}
				)});

	};

	render() {
		let {devices} = this.state;
		console.log(devices);

		window.onload = this.displayDevice.bind(this)

	return (
		<div>
		<Navbar bg="light" expand="lg">
		  <Container>
		    <Navbar.Brand href="#home">Listes des appareils</Navbar.Brand>
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="me-auto">
		        <NavDropdown title="Filtres" id="basic-nav-dropdown" className="justify-content-end">
		          <NavDropdown.Item href="#action/3.1">ON</NavDropdown.Item>
		          <NavDropdown.Item href="#action/3.2">OFF</NavDropdown.Item>
		          <NavDropdown.Item href="#action/3.3">TYPE</NavDropdown.Item>
		          <NavDropdown.Divider />
		          <NavDropdown.Item href="#action/3.4">Salon</NavDropdown.Item>
		        </NavDropdown>
		      </Nav>
		    </Navbar.Collapse>
		    <AddDevice/>
		  </Container>
		</Navbar>
		<CardGroup>

		{devices.map((device, i) => (
                        <DeviceBox img={[<BsLamp/>]} name={device.name} key={i} state="success" ipAddress={device.ip} />
                    ))}
		</CardGroup>
		</div>

	);
	};
};

export default ListDevices;