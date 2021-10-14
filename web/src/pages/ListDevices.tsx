import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import DeviceBox from '../components/DeviceBox.tsx'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { FaThermometerQuarter } from "react-icons/fa";
import { BsLamp } from "react-icons/bs";

const ListDevices = () => {

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
		  </Container>
		</Navbar>
		<CardGroup>
			<DeviceBox state="success" name='T° Salon' info='Température: 25°C' img={[<FaThermometerQuarter />]}></DeviceBox>
			<DeviceBox state="danger" name='Lampe Cuisine' info='' img={[<BsLamp/>]}></DeviceBox>
			<DeviceBox state="success" name='Lampe Salon' info='' img={[<BsLamp/>]}></DeviceBox>
			<DeviceBox state="success" name='Lampe Salon' info='' img={[<BsLamp/>]}></DeviceBox>
			<DeviceBox state="success" name='Lampe Salon' info='' img={[<BsLamp/>]}></DeviceBox>
			<DeviceBox state="success" name='Lampe Salon' info='' img={[<BsLamp/>]}></DeviceBox>
		</CardGroup>
		</div>

	);
};

export default ListDevices;