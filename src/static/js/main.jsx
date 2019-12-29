import React, { Component } from "react";
import MessageForm from "./MessageForm";
import Message from "./Message";


class Main extends Component {

    render() {
        const { underConstruction, onAddToConversation, conversation } = this.props
        let messages;
        let no_message;

        if (conversation.length > 1){
            messages = conversation.map((message) => (
                <Message message={message}/>
            ))
        } else {
            no_message = <div style={{textAlign: "center", padding: "20px 0"}}>Welcome to GrandPY Bot<br /> please ask a question.</div>
        }
        return(
            <div>
                <main className="msger-chat">
                    {messages}
                    {no_message}
                </main>
                <MessageForm
                    onAddToConversation={onAddToConversation}
                    underConstruction={underConstruction}
                />
            </div>
        )
    }
}


export default Main;