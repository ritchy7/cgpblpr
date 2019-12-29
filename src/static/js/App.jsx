import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";


class App extends Component {
    state = {
        conversation: [
            {
                "id": 1,
                "user": "GrandPY",
                "text": "Bonjour ! Bienvenue sur GrandPY Bot, pose une question relative à un lieu.",
                "hour": ""
            }
        ]
    }

    // List all of messages exchange between the human and the bot.
    handleAdd = message => {
        const conversation = [...this.state.conversation]
        conversation.push(message)
        this.setState({ conversation })
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
                <Main
                    onAddToConversation={this.handleAdd}
                    underConstruction={this.handleClick}
                    conversation={this.state.conversation}
                />
                <Footer underConstruction={this.handleClick} />
            </section>
        )
    }
}

export default App;