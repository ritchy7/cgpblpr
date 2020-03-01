import React, { useContext, useState, useRef } from "react";
import axios from "axios";
// Contexts
import ConversationContext from "../Contexts/ConversationContext";
import LoaderContext from "../Contexts/LoaderContext"


const SendMessage = () => {
    const [message, setMessage] = useState("");
    const conversationContextValue = useContext(ConversationContext);
    const loaderContextValue = useContext(LoaderContext);
    const inputRef = useRef()

    const handleChange = event => {
        // Get the written message.
        const msg = event.currentTarget.value;
        // Put the message in the state.
        setMessage(msg);
    }

    const handleSubmit = event => {
        // Stop the initial action that reset the page.
        event.preventDefault();
        const msg = message
        // Add the user message to the conversation.
        conversationContextValue.updateConversation({
            "user": "Me",
            "text": msg
        })
        // Show the loader.
        loaderContextValue.updateLoaderStatus('visible')
        // Send the message to Flask Background with Axios package.
        axios.post('/askbot', {
            message: msg
        })
            .then((response) => {
                // Get the response data.
                const responseDescription = response.data.description;
                const responseAddress = response.data.address;
                const responsePosition = response.data.position;

                if (responseAddress) {
                    let response = {
                        "user": "GrandPY",
                        "text": responseAddress
                    }
                    if (responsePosition) {
                        response["position"] = {
                            "lng": responsePosition.lng,
                            "lat": responsePosition.lat
                        }
                    }
                    conversationContextValue.updateConversation(response);
                }
                conversationContextValue.updateConversation({
                    "user": "GrandPY",
                    "text": responseDescription
                });
                loaderContextValue.updateLoaderStatus('hidden')
            })
            .catch((error) => console.log(error));
        inputRef.current.value = ''
        inputRef.current.focus()
    }

    return (
        <div className="message-box">
            <form className="message-input" onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    onChange={handleChange}
                    type="text"
                    className="message-input"
                    placeholder="Ask your question..."
                    required
                />
                <button type="submit" className="message-submit">Send</button>
            </form>
        </div>
    )
}
export default SendMessage;
