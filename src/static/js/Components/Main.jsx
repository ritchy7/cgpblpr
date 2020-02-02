import React, { useContext } from "react"
// Components
import MessageForm from "./MessageForm";
import Message from "./Message";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"

const Main = () => {
    const contextValue = useContext(ConversationContext)

    return (
        <main>
            <ol className="chat">
                    {
                        contextValue.conversation.map(
                            (message) => <Message key={message.id} message={message} />
                        )
                    }
                <MessageForm />
            </ol>
        </main>
    )
}


export default Main;
