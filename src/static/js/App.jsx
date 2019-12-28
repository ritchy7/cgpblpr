import React, { Component } from "react";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

class App extends Component {
    // Show a alert message if trying to change language.
    handleClick = (event) => {
        event.preventDefault();
        alert("Under construction...");
    }

    render() {
        return (
            <div>
                <Header underConstruction={this.handleClick}/>
                <Main underConstruction={this.handleClick}/>
                <Footer underConstruction={this.handleClick}/>
            </div>
        )
    }
}

export default App;