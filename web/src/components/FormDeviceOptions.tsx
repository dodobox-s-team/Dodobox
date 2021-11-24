import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap'

class FormDeviceOptions extends React.Component {
  state: TypeState = {
    nameDevice: this.props.name,
    ipDevice: this.props.ipAddress,
    idDevice: this.props.id,
    groupId: this.props.groupId,
    type: this.props.type,
  }

  render() {
    let { nameDevice, idDevice, ipDevice, groupId, type } = this.state;
    return (
      <div>
        <Form.Group className="mb-3" controlId="formNameDevice">
          <Form.Label>Nom de l'appareil</Form.Label>
          <Form.Control type="text" placeholder="Exemple: Lumière LED 1" defaultValue={nameDevice} maxLength="64" />
          <Form.Text className="text-muted">
            Définir le nom de l'appareil.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIpAddress">
          <Form.Label>Adresse IP de l'appareil</Form.Label>
          <Form.Control type="text" placeholder="Exemple: 172.16.1.6" defaultValue={ipDevice} maxLength="15" />
          <Form.Text className="text-muted">
            Définir l'adresse ip utilisée par l'appareil pour être reconnu dans le réseau.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTypeDevice">
          <Form.Select aria-label="groupSelect">
            <option>{type}</option>
            <option value="choiceLivingRoom">Thermomètre</option>
            <option value="choiceKitchen">Lampe</option>
            <option value="choiceChamberNumberN">Caméra</option>
            <option value="choiceAddNewGroup"> Ajouter un nouveau type </option>
          </Form.Select>
          <Form.Text className="text-muted">
            Définir le type de l'appareil.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDevice">
          <Form.Select aria-label="groupSelect">
            <option>{groupId}</option>
            <option value="choiceLivingRoom">Salon</option>
            <option value="choiceKitchen">Cuisine</option>
            <option value="choiceChamberNumberN">Chambre n°1</option>
            <option value="choiceAddNewGroup"> Ajouter un nouveau groupe </option>
          </Form.Select>
          <Form.Text className="text-muted">
            Définir le groupe associé à l'appareil.
          </Form.Text>
        </Form.Group>
      </div>
    )
  };
}

export default FormDeviceOptions;