import React, { useState, useContext, useRef, useEffect } from "react";
import ReactLoading from "react-loading";
// Components
import Message from "./Message";
import MessageForm from "./MessageForm";
// Contexts
import ConversationContext from "../Contexts/ConversationContext"
import LoaderContext from "../Contexts/LoaderContext"

const Main = () => {
    const conversationContextValue = useContext(ConversationContext)
    const [loaderStatus, setLoaderStatus] = useState("hidden");
    const loaderContextValue = {
        loaderStatus: loaderStatus,
        updateLoaderStatus: setLoaderStatus
    };
    const messageEndRef = useRef(null)
    const styles = {
        loader: {
            visibility: loaderStatus,
            display: 'flex',
            alignItems: 'center',
            'justifyContent': 'center',
            zIndex: '999',
            position: 'absolute',
            width: '100%',
            height: '94%',
            backgroundColor: 'rgba(239,239,239, 0.6)',
            borderRadius: '20px'
        }
    }

    useEffect(() => {
        setTimeout(() => {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth'})
        }, 100)
    })

    return (
        <LoaderContext.Provider value={loaderContextValue}>
            <section className="avenue-messenger">
                <div style={ styles.loader }>
                    <ReactLoading type="bubbles" style={{ width: '25%' }}/>
                </div>
                <div className="agent-face">
                    <div className="half">
                        <a href="/">
                            <img
                                className="agent circle"
                                src="https://image.flaticon.com/icons/png/512/2115/2115916.png"
                                alt="grandpybot"
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
                            conversationContextValue.conversation.map(
                                (message) => <Message key={message.id} message={message} />
                            )
                        }
                        <div ref={messageEndRef} className="message" style={{ marginBottom: "0px", visibility: "hidden"}} />
                    </div>
                    <MessageForm />
                </div>
            </section>
        </LoaderContext.Provider>
    )
}


export default Main;
