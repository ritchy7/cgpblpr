import React from "react";


const Footer = ({ underConstruction }) => {
    // Get the current year
    const current_year = new Date().getFullYear()

    return (
        <footer>
            <small>&copy; {current_year} Ritchy Blezin </small>
            <small><a href="#" onClick={underConstruction}>About</a></small>
            <small><a href="https://github.com/ritchy7/" target="_blank">Github</a></small>
        </footer>
    )
}


export default Footer;