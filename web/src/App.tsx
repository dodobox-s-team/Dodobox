import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Button from 'react-bootstrap/Button'
import SideBar from './components/SideBar'
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

function App() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };

  return (
      <div style={styles.contentDiv}>
        <SideBar></SideBar>
        <div style={styles.contentMargin}>
          <h1 style={{ padding: "20%" }}>This is Content Area</h1>
        </div>
      </div>
  );
}

export default App
