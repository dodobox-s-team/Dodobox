import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import menuIcon from '../images/burger-menu-icon.png'

function SideBar() {
    return (
        <div className="">
            <div className="sideBar navbar-expand d-flex flex-column align-item-start">
                <img src={menuIcon} className="burger-menu-icon"></img>
                <h1 className="text-center"> Menu </h1>
                <ul className="sidebar-nav">
                    <li className="">
                    <a href="" className="text-black text-decoration-none">Tableau de bord</a>
                    </li>
                    <li>
                    <a href="" className="text-black text-decoration-none">Liste des objets</a>
                    </li>
                    <li>
                    <a href="" className="text-black text-decoration-none">Salons personnalisés</a>
                    </li>
                </ul>
                <a href="" className="sidebar-parameter text-black text-decoration-none"> Paramètres </a>
            </div>
        </div>
    )
}

export default SideBar