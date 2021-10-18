import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge, MDBSwitch } from "mdbreact";
import { Component } from "react";

const Details = () => {
    return (
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
      state = {
        switch1: true,
      }
      
      handleSwitchChange = nr => () => {
        let switchNumber = `switch${nr}`;
        this.setState({
          [switchNumber]: !this.state[switchNumber]
        });
      }
      
      render() {
        return (
          <MDBSwitch checked={this.state.switch1} onChange={this.handleSwitchChange(1)} />
          );
        }
      }
      </div>
    );
};

export default Details;
