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
        // Get all messages.
        const conversation = [...this.state.conversation]
        // Add the current hour.
        const current_date = new Date()
        const current_hour = ("0" + current_date.getHours()).slice(-2) + ":" + ("0" + current_date.getMinutes()).slice(-2)
        message["hour"] = current_hour
        // Add an id to the message.
        message["id"] = Math.round(Math.random() * 100000)
        // Put the message to all messages list.
        conversation.push(message)
        // Replace the messages in the state.
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