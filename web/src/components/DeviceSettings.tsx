import React from 'react'
import ReactDOM from 'react-dom'
import FormDeviceOptions from './FormDeviceOptions.tsx'
import {Modal, Button, Form, Image, Alert} from 'react-bootstrap'
import { RiSettings2Line } from "react-icons/ri";

class DeviceSettings extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formValues : [],
            nameDevice : props.name,
            ipDevice : props.ipAddress,
            idDevice : props.id,
            groupId : props.groupId,
            type: props.type,
            modalShow: false,
            setModalShow: false,
            alertShow: false,
            setAlertShow: false,
        }
    };

    handleClose() {
        this.setState({modalShow: false});
        this.setState({alertShow: false});
    }
    handleShow() {
        this.setState({modalShow: true});
    }
    handleAlertShow() {
        this.setState({alertShow: true});
    }

    
    handleSettingsInput = (e, id) => {
        e.preventDefault();

        let dataDevice = {
            "id" : this.idDevice,
            "groupId": 1,
            "name" : e.target.elements.formNameDevice.value,
            "modele": 1,
            "type": 1,
            "ip": e.target.elements.formIpAddress.value,
         }

         fetch("https://localhost/api/devices/" + id, {method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
             body: JSON.stringify(dataDevice)
         })
             .then(response => response.json())
             .then(this.props.displayDevice.bind(this))
    }
    
    render (){
        let {nameDevice, idDevice, ipDevice, groupId, type} = this.state;
        return (
            <div>
                <Button variant="secondary" onClick={this.handleShow.bind(this)} >
                    <RiSettings2Line/>
                </Button>
            
                <Modal show={this.state.modalShow} onHide={this.handleClose.bind(this)} animation={true}>
                    <Form onSubmit={(e) => this.handleSettingsInput(e, idDevice)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Paramètres de l'appareil</Modal.Title>
                        </Modal.Header>

                        <Modal.Body> 
                            <FormDeviceOptions name={nameDevice} ipAddress={ipDevice} id={idDevice} groupId={groupId} type={type} displayDevice={this.props.displayDevice} />
                            <Alert variant="success" show={this.state.alertShow}>
                                La configuration de l'appareil a bien été sauvegardée.
                            </Alert>
                            <Alert variant="danger" show={false}>
                                La configuration de l'appareil ne peut pas être sauvegardée car le champ y n'est pas valide
                            </Alert>
                        </Modal.Body>
                    
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                Fermer la fenêtre
                            </Button>
                            <Button variant="primary" onClick={this.handleAlertShow.bind(this)} type="submit">
                                Sauvegarder
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
  };
}

export default DeviceSettings;