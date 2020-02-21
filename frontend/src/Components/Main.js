import React, { useContext } from "react";
// Components
import Message from "./Message";
import MessageForm from "./MessageForm";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"

const Main = () => {
    const contextValue = useContext(ConversationContext)

    return (
            <section className="avenue-messenger">
                <div className="agent-face">
                    <div className="half">
                        <a href="/">
                            <img
                                className="agent circle"
                                src="https://image.flaticon.com/icons/png/512/2115/2115916.png"
                                alt="grandpy bot"
                            />
                        </a>
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-title">
                        <h1>GrandPy</h1>
                        <h2>Bot</h2>
                    </div>
                    <div className="messages">
                        {
                            contextValue.conversation.map(
                                (message) => <Message key={message.id} message={message} />
                            )
                        }
                    </div>
                    <MessageForm />
                </div>
            </section>
    )
}


export default Main;
