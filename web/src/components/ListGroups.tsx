import React, { FormEvent, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { FaLayerGroup, FaPlus } from "react-icons/fa";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Group {
  id: number;
  name: string;
}

interface ListGroupsInterface {
  groups: Group[];
  isOpen: boolean;
  alert?: string;
}

class ListGroups extends React.Component<{}, ListGroupsInterface> {
  state: ListGroupsInterface = {
    groups: [],
    isOpen: false,
  };

  componentDidMount() {
    this.loadGroups();
  }

  loadGroups() {
    fetch("/api/groups", { method: "GET" })
      .then((r) => r.json())
      .then((groups) => {
        this.setState({
          groups: groups,
        });
      });
  }

  showError = (message: string) => this.setState({ alert: message });
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false, alert: undefined });
  addGroup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showError = (message: string) => this.setState({ alert: message });
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    addGroup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = JSON.stringify({
            // @ts-ignore
            name: e.target.elements.name.value,
        });
        fetch("/api/groups", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        }).then((resp) => {
            resp.json().then((r) => {
                if (!resp.ok) {
                    if (resp.status == 409) {
                        this.showError("Ce nom de groupe existe déjà !");
                    } else {
                        this.showError(r.detail);
                    }
                } else {
                    this.closeModal();
                    toast.success(`Groupe "${r.name}" ajouté avec succès !`);
                }
            });
        });
    };

  render() {
    return (
      <SubMenu title="Salles" icon={<FaLayerGroup />}>
        {this.state.groups.map((group: Group, i: number) => (
          <MenuItem key={i}>
            <Link to={"/group/" + group.id}>{group.name}</Link>
          </MenuItem>
        ))}
        <MenuItem icon={<FaPlus />} onClick={this.openModal}>
          Ajouter un groupe
        </MenuItem>

                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Form onSubmit={this.addGroup}>
                        <Modal.Header>
                            <Modal.Title>Ajouter un groupe</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nom du groupe</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Salon"
                                    required
                                />
                            </Form.Group>
                            <Alert variant="danger" show={!!this.state.alert}>
                                {this.state.alert}
                            </Alert>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                            >
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                Ajouter
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </SubMenu>
        );
    }
}

export default ListGroups;
