import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// Components
import Main from "./Main";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"
import ApiKeyContext from "../Contexts/ApiKeyContext"


const App = () => {
    const [conversation, setConversation] = useState([
        {
            "id": 1,
            "user": "GrandPY",
            "text": "Bonjour ! Bienvenue sur GrandPY Bot, pose une question relative à un lieu.",
            "hour": "Now"
        }
    ]);

    const [apiKey, setApiKey] = useState("")
    // List all of messages exchange between the human and the bot.
    const handleAdd = message => {
        // Get all messages.
        const conv = conversation
        // Add the current hour.
        moment.locale('fr');
        const current_hour = moment().format('LT');
        message["hour"] = current_hour
        // Add an id to the message.
        message["id"] = Math.round(Math.random() * 100000)
        // Put the message to all messages list.
        conv.push(message)
        // Replace the messages in the state.
        setConversation([...conv])
    };

    const handleUpdateKey = () => {
        axios.get('/get_google_key')
        .then((response) => setApiKey(response.data.key))
        .catch((error) => console.log(error))
    }
    const conversationContextValue = {
        conversation: conversation,
        updateConversation: handleAdd
    };

    const apiKeyContextValue = {
        apiKey: apiKey,
        updateApiKey: handleUpdateKey
    };

    // Scroll into the last message.
    useEffect(() => {
        let last_message = document.querySelector('.message:nth-last-child(1)');
        last_message.scrollIntoView(true)
    });

    return (
        <ConversationContext.Provider value={conversationContextValue}>
            <ApiKeyContext.Provider value={apiKeyContextValue}>
                <Main />
            </ApiKeyContext.Provider>
        </ConversationContext.Provider>
    )
}

export default App;
