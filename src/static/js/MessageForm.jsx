import React, { Component } from "react";
import axios from "axios";


class SendMessage extends Component {
    state = {
        message: ""
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
        // Get the current year.
        const current_date = new Date()
        const current_hours = ("0" + current_date.getHours()).slice(-2) + ":" + current_date.getMinutes()

        // Add the user message to the conversation.
        onAddToConversation({
            "user": "Me",
            "text": this.state.message,
            "hour": current_hours
        })

        // Send the message to Flask Background with Axios package.
        axios.post('/askbot', {
            message: this.state.message
        })
        // Get the response.
        .then(function (response) {
            onAddToConversation({
                "user": "GrandPY",
                "text": response.data.message,
                "hour": current_hours
            })
        })
        // Catch errors.
        .catch(function (error) {
            console.log(error);
        });
        this.setState({ message: "" })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className="msger-inputarea">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    type="text"
                    className="msger-input"
                    placeholder="Write your message..."
                />
                <button type="submit" className="msger-send-btn">Send</button>
            </form>
            )
    }
}

export default SendMessage;