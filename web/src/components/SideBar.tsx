import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import menuIcon from "../images/burger-menu-icon.png";
import { AiOutlineMenu, AiOutlineDashboard } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineWidgets } from "react-icons/md";
import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import ListGroups from "./ListGroups";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // added styles
  const styles = {
    sideBarHeight: {
      height: "100vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem icon={<AiOutlineDashboard />}>
          <Link to="/"> Tableau de bord </Link>
        </MenuItem>
        <MenuItem icon={<MdOutlineWidgets />}>
          <Link to="/ListDevices"> Listes des appareils </Link>
        </MenuItem>
        <ListGroups />
      </Menu>
    </ProSidebar>
  );
};

export default SideBar;
