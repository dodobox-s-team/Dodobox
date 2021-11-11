import React from "react";
import { RouteComponentProps } from "react-router";
import PageNotFound from "./errors/404";

interface Group {
  group: {
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

      this.setState({ group: await r.json(), error: undefined });
    });
  }

  render() {
    if (this.state.error !== undefined) {
      return this.state.error;
    }

    return (
      <div>
        {this.state.group.id} {this.state.group.name}
      </div>
    );
  }
}

export default GroupDetail;
