import React, { useState } from "react";
// Components
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

    return (
        <ConversationContext.Provider value={contextValue}>
            <Main />
        </ConversationContext.Provider>
    )
}

export default App;
