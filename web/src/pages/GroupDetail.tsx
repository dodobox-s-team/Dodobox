import React from "react";
import { Col, Container, Row, Modal, Form, Button } from "react-bootstrap";
import { FaCog, FaTrash } from "react-icons/fa";
import { RouteComponentProps } from "react-router";
import PageNotFound from "./errors/404";
import "../styles/GroupDetail.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Group {
  name: string;
  group?: {
    id: number;
    name: string;
  };
  error?: React.ReactElement;
}

type GroupProps = RouteComponentProps<{
  id: string;
}>;

class GroupDetail extends React.Component<GroupProps, Group> {
  state: Group = {
    group: { id: 0, name: "Loading ..." },
  };

  get id() {
    return this.props.match.params.id;
  }

  componentDidUpdate(props: GroupProps) {
    if (props.match.params.id != this.id) this.loadGroup();
  }

  componentDidMount() {
    this.loadGroup();
  }

  loadGroup() {
    fetch(`/api/groups/${this.id}`, { method: "GET" }).then(async (r) => {
      if (!r.ok) {
        switch (r.status) {
          case 404:
            this.setState({
              error: <PageNotFound message="Ce groupe n'existe pas" />,
            });
            break;
        }
        return;
      }

      const group = await r.json();
      this.setState({ group: group, name: group.name, error: undefined });
    });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    e.target.parentNode.dataset.value = e.target.value;
    this.setState({ name: e.target.value });
  };

  handleDeleteShow() {
    this.setState({ show: true })
  }

  saveChange = () => {
    // Check if the name has changed
    if (
      !this.state.group ||
      !this.state.name ||
      this.state.name.trim() == this.state.group?.name.trim()
    )
      return;

    fetch(`/api/groups/${this.state.group.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.name.trim() }),
    }).then(async (r) => {
      const result = await r.json();

      if (r.ok) {
        this.setState({ name: result.name, group: result });
      } else {
        // @ts-ignore
        this.setState({ name: this.state.group.name });
        toast.error(`Impossible de renommer ce groupe: ${result.detail}`);
      }
    });
  };

  deleteGroup = () => {
    fetch(`/api/groups/${this.id}`, { method: "DELETE" }).then(async (r) => {
      if (r.ok) {
        this.props.history.push("/groups");
        toast.success("Le groupe a bien été supprimé");
      } else {
        toast.error("Impossible de supprimer ce groupe");
      }
    });
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false, alert: undefined });

  render() {
    if (this.state.error !== undefined) {
      return this.state.error;
    }

    const style = {
      outline: "none",
    };
    return (
      <div>
        <Container fluid>
          <Row className="bg-primary text-white p-3 align-items-center">
            <Col>
              <span className="input-container text-white rounded">
                <input
                  size={1}
                  value={this.state.name}
                  onChange={this.handleChange}
                  onBlur={this.saveChange}
                  maxLength={64}
                />
              </span>
            </Col>
            <Col md="auto">
              <FaTrash size="1.3em" onClick={this.openModal} />
              <Modal show={this.state.isOpen} onHide={this.closeModal}>
                <Form onSubmit={this.deleteGroup}>
                  <Modal.Header>
                    <Modal.Title>Supprimer le groupe</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Êtes-vous sûr de vouloir supprimer ce groupe ?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                      Annuler
                    </Button>
                    <Link to="/">
                      <Button variant="primary" type="submit">
                        Supprimer
                      </Button>
                    </Link>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GroupDetail;
