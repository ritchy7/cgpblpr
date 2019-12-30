import React, { Component } from "react";
import axios from "axios";


class SendMessage extends Component {
    state = {
        message: "",
        show_animation: "hidden"
    }


    handleChange = event => {
        // Get the written message.
        const message = event.currentTarget.value;
        // Put the message in the state.
        this.setState({ message: message })
    }

    handleSubmit = event => {
        // Stop the initial action that reset the page.
        event.preventDefault();
        const onAddToConversation = this.props.onAddToConversation
        const message = this.state.message

        // Add the user message to the conversation.
        onAddToConversation({
            "user": "Me",
            "text": message
        })
        // Send the message to Flask Background with Axios package.
        // Show a charging color bar beside the input.
        this.setState({show_animation: ""})
        axios.post('/askbot', {
            message: message
        })
        .then((response) => {
            // Get the response.
            onAddToConversation({
                "user": "GrandPY",
                "text": response.data.message
            })
            this.setState({show_animation: "hidden"})
        })
        .catch((error) => console.log(error));
        this.setState({ message: "" })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className="msger-inputarea">
                <div className="load-wrapp" style={{visibility: this.state.show_animation}}>
                    <div className="load">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    type="text"
                    className="msger-input"
                    placeholder="Ask your question..."
                />
                <button type="submit" className="msger-send-btn">Send</button>
            </form>
            )
    }
}

export default SendMessage;