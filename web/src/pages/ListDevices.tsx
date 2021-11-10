import React from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDevice from '../components/AddDevice';
import SearchBar from '../components/SearchBar';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {BsLamp} from "react-icons/bs";
import Fuse from "fuse.js";

interface Device {
    id: number
    groupId: number
    name: string
    modele: string
    type: number
    ip: string
}

interface ListDevicesInterface {
    devices: Device[]
    devicesShown: Device[]
    isLoaded: boolean
}

class ListDevices extends React.Component<{}, ListDevicesInterface> {

    constructor(props: object) {
        super(props)
        this.state = {
            devices: [],
            devicesShown: [],
            isLoaded: false
        }
    };

    displayDevice() {
        fetch("https://localhost/api/devices", {method: 'GET'})
            .then(devicesElements => devicesElements.json())
            .then((response) => {
                this.setState({
                        isLoaded: true,
                        devices: response,
                        devicesShown: response
                    }
                )
            });

    };
    searchData(pattern?: string) {
        if (pattern == null || pattern == "") {
            return;
        }

        const fuse = new Fuse(this.state.devices, {
            keys: ["name", "modele"],
            threshold: 0.1,
            ignoreLocation: true
        });
        const result = fuse.search(pattern).map(({item}) => item);
        this.setState({devicesShown: result});
    };

    render() {
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
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Salon</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <SearchBar
                            placeholder="Chercher un appareil"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.searchData(e.target.value)}
                        />
                        <AddDevice/>
                    </Container>
                </Navbar>
                <Row>

                    {this.state.devicesShown.map((device: Device, i: number) => (
                        <DeviceBox img={[<BsLamp/>]} name={device.name} key={i} state="success" ipAddress={device.ip}/>
                    ))}
                </Row>
            </div>

        );
    };
}

export default ListDevices;