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
        // Get the current year.
        const current_date = new Date()
        const current_hours = ("0" + current_date.getHours()).slice(-2) + ":" + current_date.getMinutes()
        const message = this.state.message

        // Add the user message to the conversation.
        onAddToConversation({
            "id": Math.round(Math.random() * 100000),
            "user": "Me",
            "text": message,
            "hour": current_hours
        })

        // Send the message to Flask Background with Axios package.
        // Show a charging color bar beside the input.
        this.setState({show_animation: ""})
        axios.post('/askbot', {
            message: message
        })
        // Get the response.
        .then((response) => {
            onAddToConversation({
                "id": Math.round(Math.random() * 100000),
                "user": "GrandPY",
                "text": response.data.message,
                "hour": current_hours
            })
            this.setState({show_animation: "hidden"})
        })
        // Catch errors.
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