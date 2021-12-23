import React from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDevice from '../components/AddDevice';
import SearchBar from '../components/SearchBar';
import { Container, Row, NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { BsLamp } from "react-icons/bs";
import Fuse from "fuse.js";
import DevicesManagement from '../components/DevicesManagement';
import { toast } from "react-toastify";

interface Device {
  id: number
  groupId: number
  name: string
  modele: string
  type: number
  ip: string
  toggle: boolean
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

  componentDidMount() {
    this.displayDevice();
    //this.displayData();
  }

  displayDevice() {
    fetch("/api/devices", { method: 'GET' })
      .then(devicesElements => devicesElements.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          devices: response,
          devicesShown: response
        }
        )
      }, (error) => {
        if (error) {
          toast.error(`Erreur pour récupérer les modules ${error}`);
        }
      });

  };
/*
  displayData() {
    fetch("/api/graphData", { method: 'GET' })
      .then(graphDataElements => graphDataElements.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          graphDataElements: response,
          graphDataShown: response
        }
        )
      });

  };
*/
  searchData(pattern?: string) {
    if (pattern == null || pattern == "") {
      return;
    }

    const fuse = new Fuse(this.state.devices, {
      keys: ["name", "modele"],
      threshold: 0.1,
      ignoreLocation: true
    });
    const result = fuse.search(pattern).map(({ item }) => item);
    this.setState({ devicesShown: result });
  };

  render() {
    let { devices } = this.state;
    let deviceTemperature = 25;
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
            <SearchBar
              placeholder="Chercher un appareil"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.searchData(e.target.value)}
            />
            <DevicesManagement displayDevice={this.displayDevice.bind(this)} buttonFeature={"Ajouter un appareil"} fetchMethod={"POST"} />
          </Container>
        </Navbar>
        <Row>
          {this.state.devicesShown.map((device: Device, i: number) => (
            <DeviceBox key={device.id} img={[<BsLamp key={device.id} />]} name={device.name} ipAddress={device.ip} groupId={device.groupId} type={device.type} id={device.id} toggle={device.toggle} displayDevice={this.displayDevice.bind(this)} />
          ))}
        </Row>
      </div>

    );
  };
}

export default ListDevices;