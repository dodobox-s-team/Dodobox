import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap'

class FormDeviceOptions extends React.Component<{}, {}> {

  constructor(props: object) {
    super(props)
    this.state = {
      groups: [],
      isLoaded: false,
      selectedGroupOption: this.props.groupId || '',
      selectedTypeOption: this.props.type || '',
    }
  };

  displayGroups() {
    fetch("/api/groups", { method: 'GET' })
      .then(groupsElements => groupsElements.json())
      .then((response) => {
        this.setState({
          isLoaded: true,
          groups: response,
        }
        )
      });
  }

  handleSelectGroup = (e) => {
    this.setState({ selectedGroupOption: e.target.value })
  }

  handleSelectType = (e) => {
    this.setState({ selectedTypeOption: e.target.value })
  }

  componentDidMount() {
    this.displayGroups();
  }

  render() {
    return (
      <div>
        <Form.Group className="mb-3" controlId="formNameDevice">
          <Form.Label>Nom de l'appareil</Form.Label>
          <Form.Control type="text" placeholder="Exemple: Lumière LED 1" defaultValue={this.props.name} maxLength="64" />
          <Form.Text className="text-muted">
            Définir le nom de l'appareil.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIpAddress">
          <Form.Label>Adresse IP de l'appareil</Form.Label>
          <Form.Control type="text" placeholder="Exemple: 172.16.1.6" defaultValue={this.props.ipAddress} maxLength="15" />
          <Form.Text className="text-muted">
            Définir l'adresse ip utilisée par l'appareil pour être reconnu dans le réseau.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTypeDevice">
          <Form.Select aria-label="typeSelect" value={this.state.selectedTypeOption} onChange={(e) => this.handleSelectType(e)}>
            <option value={1}>Capteur température</option>
            <option value={2}>Capteur humidité</option>
            <option value={3}>Capteur qualité air</option>
          </Form.Select>
          <Form.Text className="text-muted">
            Définir le type de l'appareil.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDevice">
          <Form.Select aria-label="groupSelect" value={this.state.selectedGroupOption} onChange={(e) => this.handleSelectGroup(e)}>
            <option value=""> Ajouter à un groupe </option>
            {(this.state.groups.length > 0) ? this.state.groups.map((group) => {
              return <option key={group.id} value={group.id}> {group.name}</option>
            }) : <option value=""> Aucun groupe disponible </option>}
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