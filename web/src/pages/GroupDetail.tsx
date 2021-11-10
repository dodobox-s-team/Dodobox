import React from "react";
import { RouteComponentProps } from "react-router";

interface Group {
    id: number;
    name: string;
}

interface GroupParams {
    id: string;
}

class GroupDetail extends React.Component<{}, Group> {
    constructor(props: RouteComponentProps<GroupParams>) {
        super(props);
        this.state = {
            id: parseInt(props.match.params.id),
            name: "Loading ...",
        };
        this.loadGroup();
    }

    loadGroup() {
        fetch("/api/groups/" + this.state.id, { method: "GET" })
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
