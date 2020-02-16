import React from 'react';
import GoogleMapReact from 'google-map-react';

const show_message_position = (user) => {
    return user !== "Me" ? { position: "left", class: "is-success" } : { position: "right", class: "is-info" }
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
    let messageProperties = show_message_position(message.user)
    let map = "position" in message ? show_map(message.position) : ""

    return (
        <div className="message new">
            <figure className="avatar">
                <img src="http://askavenue.com/img/17.jpg" alt="grandpybot" />
            </figure>
            {message.text}
            <div className="timestamp">{message.hour}</div>
            <div className="checkmark-read">✓✓</div>
        </div>
    )
}

export default Message;
