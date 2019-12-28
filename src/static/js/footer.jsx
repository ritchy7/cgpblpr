import React from "react";

// Get the current year
const current_year = new Date().getFullYear()

const Footer = ({ underConstruction }) => (
    <footer>
        <small>&copy; {current_year} Ritchy Blezin </small>
        <small><a href="#" onClick={underConstruction}>About</a></small>
    </footer>
)


export default Footer;