import React from 'react'
import ReactDOM from 'react-dom'
import FormDeviceOptions from './FormDeviceOptions.tsx'
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap'
import { useState } from 'react'

class AddDevice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            setModalShow: false,
            alertShow: false,
            setAlertShow: false,
        }
    };

    handleClose() {
        this.setState({ modalShow: false });
        this.setState({ alertShow: false });
    }
    handleShow() {
        this.setState({ modalShow: true });
    }
    handleAlertShow() {
        this.setState({ alertShow: true });
    }

    handleAddDeviceInput = (e) => {
        e.preventDefault();

        let dataDevice = {
            "groupId": 1,
            "name": e.target.elements.formNameDevice.value,
            "modele": 1,
            "type": 1,
            "ip": e.target.elements.formIpAddress.value,
        }

        fetch("https://localhost/api/devices", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(dataDevice)
        })
            .then(response => response.json())
            .then(this.props.displayDevice.bind(this))
    }

    render() {
        return (
            <div>
                <Button variant="secondary" onClick={this.handleShow.bind(this)} > Ajouter un appareil </Button>
                <Modal show={this.state.modalShow} onHide={this.handleClose.bind(this)} animation={true}>
                    <Form onSubmit={(e) => this.handleAddDeviceInput(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title> Ajouter un appareil </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormDeviceOptions />
                            <Alert variant="success" show={this.state.alertShow}>
                                La configuration de l'appareil a bien été sauvegardée.
                            </Alert>
                            <Alert variant="danger" show={false}>
                                La configuration de l'appareil ne peut pas être sauvegardée car le champ y n'est pas valide
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Fermer la fenêtre
                            </Button>
                            <Form.Group>
                                <Button variant="primary" type={"submit"}>
                                    Ajouter l'appareil
                                </Button>
                            </Form.Group>
                        </Modal.Footer>
                    </Form>
                </Modal>

            </div>
        );
    }
};

export default AddDevice;