import React from "react";


const Main = ({ underConstruction }) => (
    <main className="main-intro">
        <p>Under construction <span className="icon-heart">&#x1F4E7;</span></p>
        <p className="send"><a href="#" onClick={underConstruction}>Send</a></p>
    </main>
)


export default Main;