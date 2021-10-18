import React from 'react'
import ReactDOM from 'react-dom'
import {Modal, Button, Form, Image} from 'react-bootstrap'
import {useState} from 'react'
import { RiSettings2Line } from "react-icons/ri";

function DeviceSettings(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div>
            <Button variant="secondary" onClick={handleShow} >
                <RiSettings2Line/>
            </Button>
  
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Paramètres de l'appareil</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNameDevice">
                            <Form.Label>Nom de l'appareil</Form.Label>
                            <Form.Control type="text" placeholder="Exemple: Lumière LED 1" />
                            <Form.Text className="text-muted">
                                Définir le nom de l'appareil.
                            </Form.Text>

                        </Form.Group>
                    
                    
                        <Form.Group className="mb-3" controlId="formIpAddress">
                            <Form.Label>Adresse IP de l'appareil</Form.Label>
                            <Form.Control type="text" placeholder="Exemple: 172.16.1.6" />
                            <Form.Text className="text-muted">
                            Définir l'adresse ip utilisée par l'appareil pour être reconnu dans le réseau.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIpAddress">
                            <Form.Select aria-label="groupSelect">
                                <option>Sélectionnez le groupe</option>
                                <option value="choiceLivingRoom">Salon</option>
                                <option value="choiceKitchen">Cuisine</option>
                                <option value="choiceChamberNumberN">Chambre n°1</option>
                                <option value="choiceAddNewGroup">Ajouter un nouveau groupe</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                Définir le groupe associé à l'appareil.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer la fenêtre
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  };

export default DeviceSettings;