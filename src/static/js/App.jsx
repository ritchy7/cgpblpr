import React, { Component } from "react";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";


class App extends Component {
    state = {
        message: ""
    }

    // Show a alert message if trying to change language.
    handleClick = (event) => {
        event.preventDefault();
        alert("Under construction...");
    }

    render() {
        return (
            <section className="msger">
                <Header underConstruction={this.handleClick} />
                <Main underConstruction={this.handleClick} />
                <Footer underConstruction={this.handleClick} />
            </section>
        )
    }
}

export default App;