import React, { useContext, useState } from "react";
import axios from "axios";
// Contexts
import ConversationContext from "../Contexts/ConversationContext";


const SendMessage = () => {
    const [message, setMessage] = useState("");
    const [showAnimation, setShowAnimation] = useState("hidden");
    const contextValue = useContext(ConversationContext);

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
                    contextValue.updateConversation(response);
                }
                contextValue.updateConversation({
                    "user": "GrandPY",
                    "text": responseDescription
                });
                setShowAnimation("hidden");
            })
            .catch((error) => console.log(error));
        setMessage("");
    }

    return (
        <div className="message-box">
            <form className="message-input" onSubmit={handleSubmit}>
                <textarea
                    onChange={handleChange}
                    type="text"
                    className="message-input"
                    placeholder="Ask your question..."
                    required
                >
                </textarea>
                <button type="submit" className="message-submit">Send</button>
            </form>
        </div>
    )
}
export default SendMessage;
