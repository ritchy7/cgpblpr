import React, { Component } from "react"
import MessageForm from "./MessageForm";
import Message from "./Message";


class Main extends Component {


    render() {
        const { underConstruction, onAddToConversation, conversation } = this.props
        return(
            <div>
                <main className="msger-chat">
                    {
                        conversation.map(
                            (message) => <Message key={message.id} message={message}/>
                        )
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