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
                <div className="menu">
                    <div className="items">
                        <span>
                            <a href="#" title="Minimize">&mdash;</a><br/>
                            <a href="#" title="End Chat">&#10005;</a>
                        </span>
                    </div>
                    <div className="button">...</div>
                </div>
                <div className="agent-face">
                    <div className="half">
                        <img className="agent circle" src="http://askavenue.com/img/17.jpg" alt="Jesse Tino" />
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-title">
                        <h1>Jesse Tino</h1>
                        <h2>RE/MAX</h2>
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
