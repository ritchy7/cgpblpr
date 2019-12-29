import React, { Component } from "react";
import MessageForm from "./MessageForm";
import Message from "./Message";


class Main extends Component {

    render() {
        const { underConstruction, onAddToConversation, conversation } = this.props
        return(
            <div>
                <main className="msger-chat">
                    // If there a at least one message show them or show
                    // a message inviting you to ask a question.
                    {
                        conversation.length > 1 ?
                        conversation.map((message) => (<Message message={message}/>))
                        :
                        <div style={{textAlign: "center", padding: "20px 0"}}>
                            Welcome to GrandPY Bot<br /> please ask a question.
                        </div>
                    }
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