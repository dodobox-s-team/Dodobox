import React from 'react'
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
import { Form } from 'react-bootstrap'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: this.props.match.params.id
    };
  }

  detailsApi() {
//    fetch(`https://localhost/api/devices/${window.id}`, { method: 'GET' })
    fetch(`https://localhost/api/devices/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then((reponse) => {
        this.setState({
          isLoaded: true,
          devices: reponse
        });
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
    const { error, isLoaded, devices } = this.state;

    window.onload = this.detailsApi.bind(this);

    if (error) {
      return <div>Erreur: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
      return (


        <div>

          {(devices.map((device, i) =>

            <MDBContainer>
              <MDBListGroup style={{ width: "22rem" }}>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Name: {device.name}<MDBBadge color="primary"
                  pill>14</MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Groupe: {device.groupId}<MDBBadge color="primary"
                  pill>1</MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Modèle: {device.modele}<MDBBadge
                  color="primary" pill>2</MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">IP: {device.ip}<MDBBadge color="primary"
                  pill>1</MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Type: {device.type}<MDBBadge color="primary"
                  pill>1</MDBBadge>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>

          )
          )


          };
        </div>
      )

    };
  };
}
export default Details;