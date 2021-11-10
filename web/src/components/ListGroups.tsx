import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface Group {
    id: number;
    name: string;
}

interface ListGroupsInterface {
    groups: Group[];
}

class ListGroups extends React.Component<{}, ListGroupsInterface> {
    constructor(props: object) {
        super(props);
        this.state = {
            groups: [],
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

    render() {
        return (
            <SubMenu title="Salles" icon={<FaLayerGroup />}>
                {this.state.groups.map((group: Group, i: number) => (
                    <MenuItem key={i}>
                        <Link to={"/group/" + group.id}>{group.name}</Link>
                    </MenuItem>
                ))}
            </SubMenu>
        );
    }
}

export default ListGroups;
