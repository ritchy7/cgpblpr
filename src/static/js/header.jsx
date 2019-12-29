import React, { Component } from "react";

const grandpy_style = {
    backgroundColor: "#00C441",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#666666",
    padding: "5px"
};
const Header = ({ underConstruction }) => (
    <header className="msger-header">
        <div className="msger-header-title">
            <i className="fas fa-comment-alt">
                <a style={grandpy_style} href="/">GrandPY</a> - Tchat Bot
            </i>
        </div>
        <div className="msger-header-options">
            <span><i className="fas fa-cog"></i></span>
        </div>
    </header>
)


export default Header;