import React from 'react'
import ReactDOM from 'react-dom'
import FormDeviceOptions from './FormDeviceOptions.tsx'
import {Modal, Button, Form, Image, Alert} from 'react-bootstrap'
import {useState} from 'react'

function AddDevice(props) {
    const [modalShow, setModalShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    const handleClose = () => {
         setModalShow(false);
         setAlertShow(false);
    }
    const handleShow = () => setModalShow(true);
    const handleAlertShow = () => setAlertShow(true);
  
    return (
        <div>
            <Button variant="secondary" onClick={handleShow} > Ajouter un appareil </Button>
  
            <Modal show={modalShow} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Ajouter un appareil </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormDeviceOptions/>
                    <Alert variant="success" show={alertShow}>
                        La configuration de l'appareil a bien été sauvegardée.
                    </Alert>
                    <Alert variant="danger" show={false}>
                        La configuration de l'appareil ne peut pas être sauvegardée car le champ y n'est pas valide
                    </Alert>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer la fenêtre
                    </Button>
                    <Button variant="primary" onClick={handleAlertShow}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  };

export default AddDevice;