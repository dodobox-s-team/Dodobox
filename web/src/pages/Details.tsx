import React from 'react'
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
import { Form } from 'react-bootstrap'

const Details = () => {
  return (
    <>
      <div>
        <MDBContainer>
          <MDBListGroup style={{ width: "22rem" }}>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">Name: {'exemple'}<MDBBadge color="primary"
              pill>14</MDBBadge>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">Groupe: {'exemple'}<MDBBadge color="primary"
              pill>1</MDBBadge>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">Modèle: {'exemple'}<MDBBadge
              color="primary" pill>2</MDBBadge>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">IP: {'exemple'}<MDBBadge color="primary"
              pill>1</MDBBadge>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">Type: {'exemple'}<MDBBadge color="primary"
              pill>1</MDBBadge>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBContainer>
      </div>

      <div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="système online"
        />
      </div>
    </>
  );
};

export default Details;
