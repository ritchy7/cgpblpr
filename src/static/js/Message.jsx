import React, { Component } from "react";


const Message = ({ message }) => {
    let message_position = message.user == "Me" ? "msg right-msg" : "msg left-msg"

    return (
        <div className={message_position}>
            <div className="msg-img"></div>

            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{message.user}</div>
                    <div className="msg-info-time">{message.hour}</div>
                </div>

                <div className="msg-text">
                    {message.text}
                    <h1 id="resultat"></h1>
                </div>
            </div>
        </div>
    )
}

export default Message;