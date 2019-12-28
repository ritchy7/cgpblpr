import React, { Component } from "react";

const Header = ({ underConstruction }) => (
    <header className="msger-header">
        <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> GrandPY - Tchat Bot
        </div>
        <div className="msger-header-options">
            <span><i className="fas fa-cog"></i></span>
        </div>
    </header>
)


export default Header;