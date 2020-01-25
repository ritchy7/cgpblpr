import React, { useContext, useState } from "react";
import axios from "axios";
// Contexts
import ConversationContext from "../Contexts/ConversationContext";


const SendMessage = () => {

    const [message, setMessage] = useState("")
    const [showAnimation, setShowAnimation] = useState("hidden")
    const contextValue = useContext(ConversationContext)

    const handleChange = event => {
        // Get the written message.
        const msg = event.currentTarget.value;
        // Put the message in the state.
        setMessage(msg)
    }

    const handleSubmit = event => {
        // Stop the initial action that reset the page.
        event.preventDefault();
        const msg = message
        // Add the user message to the conversation.
        contextValue.updateConversation({
            "user": "Me",
            "text": msg
        })
        // Send the message to Flask Background with Axios package.
        // Show a charging color bar beside the input.
        setShowAnimation("")
        axios.post('/askbot', {
            message: msg
        })
            .then((response) => {
                // Get the response.
                const responseDescription = response.data.description
                const responseAddress = response.data.address
                const responsePosition = response.data.position

                if (responseAddress) {
                    contextValue.updateConversation({
                        "user": "GrandPY",
                        "text": responseAddress
                    })
                    if (responseDescription){
                        contextValue.updateConversation({
                            "user": "GrandPY",
                            "text": responseDescription
                        })
                    } else {
                        contextValue.updateConversation({
                            "user": "GrandPY",
                            "text": "Par contre je n'ai pas d'anecdote pour le coup.."
                        })
                    }
                } else {
                    console.log(2)
                    contextValue.updateConversation({
                        "user": "GrandPY",
                        "text": "Je n'ai rien trouvé réessaie avec plus de précision."
                    })
                }
                setShowAnimation("hidden")
            })
            .catch((error) => console.log(error));
        setMessage("")
    }
    return (
        <form onSubmit={handleSubmit} className="msger-inputarea">
            <div className="load-wrapp" style={{ visibility: showAnimation }}>
                <div className="load">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <input
                onChange={handleChange}
                value={message}
                type="text"
                className="msger-input"
                placeholder="Ask your question..."
                required
            />
            <button type="submit" className="msger-send-btn">Send</button>
        </form>
    )
}
export default SendMessage;
