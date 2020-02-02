import React from "react";

const Header = ({ underConstruction }) => {
    return (
        <header className="navbar">
            <div className="name"><a href="/">GrandPY - Tchat Bot</a></div>
            <div><a href="#" onClick={underConstruction}>About</a></div>
            <div><a href="https://github.com/ritchy7/" target="_blank">Github</a></div>
            <div>&copy; {new Date().getFullYear()} Ritchy Blezin </div>
        </header>
    )
}


export default Header;
