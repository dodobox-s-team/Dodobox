import React from 'react'
import ReactDOM from 'react-dom'
import {Modal, Button, Form, Image, Alert} from 'react-bootstrap'
import {useState} from 'react'
import FormDeviceOptions from './FormDeviceOptions'

class EditDevice extends React.Component {

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

    handleInput = (e, id) => {
        e.preventDefault();

        let dataDevice = {
            "id" : this.idDevice,
            "groupId": 1,
            "name" : e.target[0].value,
            "modele": 1,
            "type": 1,
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
                    <FormDeviceOptions name={nameDevice} ipAddress={ipDevice} idDevice={idDevice} groupId={groupId} type={type}/>
                </Form>

            </div>
                    
        )
  };

}

export default EditDevice;