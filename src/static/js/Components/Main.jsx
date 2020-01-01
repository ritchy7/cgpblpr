import React, { useContext } from "react"
// Components
import MessageForm from "./MessageForm";
import Message from "./Message";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"

const Main = () => {
    const contextValue = useContext(ConversationContext)

    return (
        <div>
            <main className="msger-chat">
                {
                    contextValue.conversation.map(
                        (message) => <Message key={message.id} message={message} />
                    )
                }
            </main>
            <MessageForm />
        </div>
    )
}


export default Main;