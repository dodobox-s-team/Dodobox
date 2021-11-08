import React from 'react'
import {MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge} from "mdbreact";
import GraphiqueEnergie from "../components/GraphiqueEnergie";
//import { Form } from 'react-bootstrap'
import {useParams} from 'react-router-dom'

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            devices: []
        };
    }

    detailsApi(idParameter) {

        fetch(`https://localhost/api/devices/` + idParameter)
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


    render() {
        const {error, isLoaded, devices} = this.state;
        console.log(devices);
        let id = this.props.match.params.id
        console.log(id);
        console.log(typeof (id));


        window.onload = () => this.detailsApi(id);

        if (error) {
            return <div>Erreur: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Chargement...</div>;
        } else {
            return (
                <div>

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