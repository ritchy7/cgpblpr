import React, { Component } from "react";

const show_profil_picture = (user) => {
    if (user == "me"){
        return <img src="https://image.flaticon.com/icons/svg/189/189061.svg" draggable="false"/>
    }
    return <img src="https://image.flaticon.com/icons/png/512/2115/2115916.png" draggable="false"/>
}


const Message = ({ message }) => {
    let message_position = message.user == "Me" ? "self" : "other"
    let user_image = show_profil_picture(message.user)
    
    return (
        <li className={message_position}>
            <div className="avatar">
                {user_image}
            </div>
          <div className="msg">
            <p>{message.text}</p>
            <time>{message.hour}</time>
          </div>
        </li>
    )
}

export default Message;
