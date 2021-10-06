import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Button from 'react-bootstrap/Button'
import SideBar from './components/SideBar'
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

function App() {

  return (
    <div className="App">
      <SideBar />
    </div>
  )
}

export default App
