import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

const show_profil_picture = (user) => {
    if (user == "Me"){
        return <img src="https://image.flaticon.com/icons/svg/189/189061.svg" draggable="false"/>
    }
    return <img src="https://image.flaticon.com/icons/png/512/2115/2115916.png" draggable="false"/>
}

const show_message_position = (user) => {
    return user == "Me" ? "self" : "other"
}

const show_map = (position) => {
    const Marker = ({ text }) => <div className="pin bounce">{text}<div className="pulse"></div></div>;
    const center = {
        "lng": Number(position.lng.toFixed(3)),
        "lat": Number(position.lat.toFixed(3))
    }
    console.log(position)

    return (
            <div style={{ height: '50vh', width: '400px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyCsbdajpSzxVB_D1AMJkLKDtmkH5uQ3B5M",
                        language: "fr",
                    }}
                    options={{
                        mapTypeControl: false,
                        scrollwheel: false,
                        panControl: false,
                    }}

                    defaultCenter={center}
                    defaultZoom={15}
                >
                    <Marker
                        lat={position.lat}
                        lng={position.lng}

                    />
                </GoogleMapReact>
            </div>
  )
}


const Message = ({ message }) => {
    let message_position = show_message_position(message.user)
    let user_image = show_profil_picture(message.user)
    let map = "position" in message ? show_map(message.position) : ""

    return (
        <li className={message_position}>
            <div className="avatar">
                {user_image}
            </div>
          <div className="msg">
            {map}
            <p>{message.text}</p>
            <time>{message.hour}</time>
          </div>
        </li>
    )
}

export default Message;
