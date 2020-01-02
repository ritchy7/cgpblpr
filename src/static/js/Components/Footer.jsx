import React from "react";


const Footer = ({ underConstruction }) => {
    return (
        <footer>
            <small>&copy; {new Date().getFullYear()} Ritchy Blezin </small>
            <small><a href="#" onClick={underConstruction}>About</a></small>
            <small><a href="https://github.com/ritchy7/" target="_blank">Github</a></small>
        </footer>
    )
}


export default Footer;