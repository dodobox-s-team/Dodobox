import React from 'react'
import ReactDOM from 'react-dom'
import FormDeviceOptions from './FormDeviceOptions'
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap'
import { RiSettings2Line } from "react-icons/ri";

interface DevicesManagementInterface {
  modalShow: boolean;
  setModalShow: boolean;
  validAlertShow: boolean;
  invalidAlertShow: boolean;
  setInvalidAlertShow: boolean;
  setValidAlertShow: boolean;
  modalErrorMessage: string,
}

class DevicesManagement extends React.Component<{}, DevicesManagementInterface> {

  state: DevicesManagementInterface = {
    modalShow: false,
    setModalShow: false,
    validAlertShow: false,
    invalidAlertShow: false,
    setInvalidAlertShow: false,
    setValidAlertShow: false,
    modalErrorMessage: "",
  }


  handleClose() {
    this.setState({ modalShow: false });
    this.setState({ validAlertShow: false });
    this.setState({ invalidAlertShow: false });
  }
  handleShow() {
    this.setState({ modalShow: true });
  }
  handleValidAlertShow() {
    if (this.invalidAlertShow) {
      this.setState({ validAlertShow: false });
    } else {
      this.setState({ validAlertShow: true });
      this.setState({ invalidAlertShow: false });
    }
  }

  handleInvalidAlertShow() {
    if (this.validAlertShow) {
      this.setState({ invalidAlertShow: false })
    } else {
      this.setState({ validAlertShow: false })
      this.setState({ invalidAlertShow: true })
    }
  }

  handleSettingsInput = (e, methodParameter, id) => {
    e.preventDefault();
    let groupField = e.target.elements.formGroupDevice.value
    let nameField = e.target.elements.formNameDevice.value.trim()
    let ipField = e.target.elements.formIpAddress.value.trim()

    if (groupField == "") {
      groupField = null
    }
    let dataDevice = {
      "groupId": groupField,
      "name": nameField,
      "modele": "ESP",
      "type": 1,
      "ip": ipField,
      "toggle": false,
    }
    let regexIpv4Address = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let valueIpv4AddressForm = dataDevice.ip;

    if (((e.target.elements.formNameDevice.value).trim() == "") && !(regexIpv4Address.test(valueIpv4AddressForm))) {
      this.handleInvalidAlertShow();
      this.state.modalErrorMessage = "le nom de l'appareil doit contenir au moins un caractère ou le format de l'adresse IP n'est pas valide.";
    }
    else if ((e.target.elements.formNameDevice.value).trim() == "") {
      this.handleInvalidAlertShow();
      this.state.modalErrorMessage = "le nom de l'appareil doit contenir au moins un caractère.";
    }
    else if ((valueIpv4AddressForm).length > 15 || !(regexIpv4Address.test(valueIpv4AddressForm))) {
      this.handleInvalidAlertShow();
      this.state.modalErrorMessage = "le format de l'adresse IP n'est pas valide.";
    }

    else {
      fetch("/api/devices" + (isNaN(id) ? "" : `/${id}`), {
        method: methodParameter,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dataDevice)
      })
        .then(async response => {
          response.json()
          if (!response.ok) {
            if (response.status == 409)
              this.handleInvalidAlertShow();
            this.state.modalErrorMessage = "le nom ou l'adresse ip de l'appareil existe déjà"
          }
        })
        .then(this.props.displayDevice.bind(this))
    }
  }

  render() {
    return (
      <div>
        <Button variant="secondary" onClick={this.handleShow.bind(this)} >
          {this.props.buttonFeature}
        </Button>

        <Modal show={this.state.modalShow} onHide={this.handleClose.bind(this)} animation={true}>
          <Form onSubmit={(e) => this.handleSettingsInput(e, this.props.fetchMethod, this.props.id)}>
            <Modal.Header closeButton>
              <Modal.Title>Paramètres de l'appareil</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormDeviceOptions name={this.props.name} ipAddress={this.props.ipAddress} id={this.props.id} groupId={this.props.groupId} type={this.props.type} displayDevice={this.props.displayDevice} />
              <Alert variant="success" show={this.state.validAlertShow}>
                {((this.props.fetchMethod == "PUT") ? `La configuration de l'appareil ${this.props.name} a  bien été sauvegardée.` : `L'appareil a bien été rajouté à la liste des appareils.`)}
              </Alert>
              <Alert variant="danger" show={this.state.invalidAlertShow}>
                La configuration de l'appareil « {this.props.name} » ne peut pas être sauvegardée car {this.state.modalErrorMessage}
              </Alert>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                Fermer la fenêtre
              </Button>
              <Button variant="primary" onClick={this.handleValidAlertShow.bind(this)} type="submit">
                Sauvegarder
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  };
}

export default DevicesManagement;