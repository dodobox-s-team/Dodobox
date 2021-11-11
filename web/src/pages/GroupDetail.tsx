import React from "react";
import { RouteComponentProps } from "react-router";

interface Group {
    id: number;
    name: string;
}

type GroupProps = RouteComponentProps<{
    id: string;
}>;

class GroupDetail extends React.Component<GroupProps, Group> {
    state: Group = {
        id: 0,
        name: "Loading ...",
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
        fetch(`/api/groups/${this.id}`, { method: "GET" })
            .then((r) => r.json())
            .then((group) => {
                this.setState(group);
            });
    }

    render() {
        return (
            <div>
                {this.state.id} {this.state.name}
            </div>
        );
    }
}

export default GroupDetail;
