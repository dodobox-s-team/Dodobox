import React from 'react'
import {MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge} from "mdbreact"
import GraphiqueEnergie from "../components/GraphiqueEnergie"
import {Button, Modal} from 'react-bootstrap'
import {useParams, Link} from 'react-router-dom'
import {RouteComponentProps} from "react-router"

type DetailsProps = RouteComponentProps<{
  id: string;
}>;

interface Device {
  id: number
  groupId: number
  name: string
  modele: string
  type: number
  ip: string
}

interface DetailsInterface {
  error: string;
  isLoaded: boolean;
  devices: Device[];
}

class Details extends React.Component<DetailsProps, DetailsInterface> {

  state: DetailsInterface = {
    modalShow: false,
    setModalShow: false,
    validAlertShow: false,
    invalidAlertShow: false,
    setInvalidAlertShow: false,
    setValidAlertShow: false,
    modalErrorMessage: "",
    show: false,
  }

  get id() {
    return this.props.match.params.id;
  }

  handleDeleteClose(del: boolean) {
    this.setState({show: false})
    if (del) {
      this.deleteDevice(this.id)
    }
  }

  handleDeleteShow() {
    this.setState({show: true})
  }

  componentDidMount() {
    this.detailsApi(this.id)
  }

  componentDidUpdate(props: DetailsProps) {
    if (props.match.params.id != this.id) this.detailsApi(this.id);
  }

  detailsApi(idParameter) {
    fetch(`/api/devices/` + idParameter)
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            devices: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  deleteDevice(idParameter) {
    fetch('/api/devices/' + idParameter, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then((result) => {
          console.log(result)
        },
        (error) => {
          this.setState({
            error
          });
        })
  }

  render() {
    const {error, isLoaded, devices} = this.state

    if (error) {
      return <div>Erreur: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
      return (
        <div>
          <Button variant="danger" onClick={this.handleDeleteShow.bind(this)}>Supprimer l'appareil</Button>
          <Modal show={this.state.show} onHide={this.handleDeleteClose.bind(this, false)}>
            <Modal.Header closeButton>
              <Modal.Title>Suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes vous sûr de supprimer un appareil!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleDeleteClose.bind(this, false)}>
                Annuler
              </Button>
              <Link to="/ListDevices">
                <Button variant="primary" onClick={this.handleDeleteClose.bind(this, true)}>
                  Supprimer
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
          <MDBContainer>
            <MDBListGroup style={{width: "22rem"}}>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center">Name: {devices.name}<MDBBadge
                color="primary"
                pill></MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center">Groupe: {devices.groupId}<MDBBadge
                color="primary"
                pill></MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center">Modèle: {devices.modele}<MDBBadge
                color="primary" pill></MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center">IP: {devices.ip}<MDBBadge
                color="primary"
                pill></MDBBadge>
              </MDBListGroupItem>
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center">Type: {devices.type}<MDBBadge
                color="primary"
                pill></MDBBadge>
              </MDBListGroupItem>
            </MDBListGroup>
            <GraphiqueEnergie data={[15, 24, 18, 19]} labels={["test1", "test2", "test3", "test4"]}/>
          </MDBContainer>
        </div>
      )
    }
    ;
  };
}

export default Details;
