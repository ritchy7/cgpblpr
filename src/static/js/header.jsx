import React, { Component } from "react";

const Header = ({ underConstruction }) => (
    <header>
        <nav className="global-nav">
            <ul>
                <li><a href="#" onClick={underConstruction}>English</a></li>
                <li><a href="#" onClick={underConstruction}>French</a></li>
            </ul>
        </nav>
        <h1>Grandpy <span className="animated pulse">Bot</span></h1>
    </header>
)


export default Header;