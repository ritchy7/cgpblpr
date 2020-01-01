import React from "react"
import MessageForm from "./MessageForm";
import Message from "./Message";


const Main = ({ onAddToConversation, conversation }) => (
    <div>
        <main className="msger-chat">
            {
                conversation.map(
                    (message) => <Message key={message.id} message={message} />
                )
            }
        </main>
        <MessageForm
            onAddToConversation={onAddToConversation}
        />
    </div>
)



export default Main;