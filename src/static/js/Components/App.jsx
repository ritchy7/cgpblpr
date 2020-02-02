import React, { useState } from "react";
// Components
import Header from "./Header";
import Main from "./Main";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"



const App = () => {
    const [conversation, setConversation] = useState([
        {
            "id": 1,
            "user": "GrandPY",
            "text": "Bonjour ! Bienvenue sur GrandPY Bot, pose une question relative à un lieu.",
            "hour": "Now"
        }
    ]);
    // List all of messages exchange between the human and the bot.
    const handleAdd = message => {
        // Get all messages.
        const conv = conversation
        // Add the current hour.
        const current_date = new Date()
        const current_hour = ("0" + current_date.getHours()).slice(-2) + ":" + ("0" + current_date.getMinutes()).slice(-2)
        message["hour"] = current_hour
        // Add an id to the message.
        message["id"] = Math.round(Math.random() * 100000)
        // Put the message to all messages list.
        conv.push(message)
        // Replace the messages in the state.
        setConversation([...conv])
    };
    const contextValue = {
        conversation: conversation,
        updateConversation: handleAdd
    };

    // Show a alert message if trying to change language.
    const handleClick = (event) => {
        event.preventDefault();
        alert("Under construction...");
    }

    return (
        <ConversationContext.Provider value={contextValue}>
            <Header underConstruction={handleClick}/>
            <Main />
        </ConversationContext.Provider>
    )
}

export default App;
