import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Button from 'react-bootstrap/Button'
import SideBar from './components/SideBar'
import Dashboard from './pages/Dashboard'
import ListDevices from './pages/ListDevices'
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
    <Router>
      <div style={styles.contentDiv}>
        <SideBar></SideBar>
        <div style={styles.contentMargin}>
          <Switch>
            <Route path="/ListDevices">
              <ListDevices />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App
