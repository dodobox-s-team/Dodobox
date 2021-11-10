import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FaLayerGroup, FaPlus } from "react-icons/fa";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface Group {
    id: number;
    name: string;
}

interface ListGroupsInterface {
    groups: Group[];
    isOpen: boolean;
}

class ListGroups extends React.Component<{}, ListGroupsInterface> {
    constructor(props: object) {
        super(props);
        this.state = {
            groups: [],
            isOpen: false,
        };
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

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

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
                    <Modal.Header>
                        <Modal.Title>Ajouter un groupe</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>test</Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Annuler
                        </Button>
                        <Button variant="primary">Ajouter</Button>
                    </Modal.Footer>
                </Modal>
            </SubMenu>
        );
    }
}

export default ListGroups;
