import React from 'react'
import ReactDOM from 'react-dom'
import {Modal, Button, Form, Image, Alert} from 'react-bootstrap'
import {useState} from 'react'

class FormDeviceOptions extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            formValues : [],
            nameDevice : props.name,
            ipDevice : props.ipAddress,
            idDevice : props.id,
            groupId : props.groupId,
            type: props.type,
        }
    };

    handleInput = (e, id) => {
        e.preventDefault();

        let dataDevice = {
            "id" : this.idDevice,
            "groupId": this.groupId,
            "name" : e.target[0].value,
            "modele": e.target[3].value,
            "type": e.target[2].value,
            "ip": e.target[1].value,
         }

         fetch("https://localhost/api/devices/" + id, {method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
             body: JSON.stringify(dataDevice)
         })
             .then(response => response.json())
    }

    render (){
        let {nameDevice, idDevice, ipDevice, groupId, type} = this.state;
        return (
            <div>
                <Form onSubmit={(e) => this.handleInput(e, idDevice)}>
                    <Form.Group className="mb-3" controlId="formNameDevice">
                        <Form.Label>Nom de l'appareil</Form.Label>
                        <Form.Control type="text" placeholder="Exemple: Lumière LED 1" defaultValue={nameDevice}/>
                        <Form.Text className="text-muted">
                            Définir le nom de l'appareil.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIpAddress">
                        <Form.Label>Adresse IP de l'appareil</Form.Label>
                        <Form.Control type="text" placeholder="Exemple: 172.16.1.6" defaultValue={ipDevice} />
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
                        <Button variant={"primary"} type={"submit"}>
                            Sauvegarder
                        </Button>
                    </Form.Group>
                </Form>
                
            </div>
        )
  };

}

export default FormDeviceOptions;