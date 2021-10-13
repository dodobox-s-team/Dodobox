import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

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
			<Card
				bg="success"
				text='white'
				style={{ width: '18rem' }}
				className="m-2"
			>
				<Card.Body>
					<Card.Title>T° Salon</Card.Title>
					<Card.Text>
						Température: 25°C
					</Card.Text>
				</Card.Body>
			</Card>
			<Card
				bg="danger"
				text='white'
				style={{ width: '18rem' }}
				className="m-2"
			>
				<Card.Body>
					<Card.Title>Lampe Cuisine</Card.Title>
				</Card.Body>
			</Card>
			<Card
				bg="success"
				text='white'
				style={{ width: '18rem' }}
				className="m-2"
			>
				<Card.Body>
					<Card.Title>Lampe Salon</Card.Title>
				</Card.Body>
			</Card>
		</CardGroup>
		</div>

	);
};

export default ListDevices;