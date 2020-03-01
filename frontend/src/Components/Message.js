import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";


const Message = ({ message }) => {
    const [apiKey, setApiKey] = useState(null)

    const handleUpdateKey = () => {
        axios.get('http://localhost:8000/get_google_key')
        .then((response) => setApiKey(response.data.key))
        .catch((error) => console.log(error))
    }

    const get_properties = (user) => {
        if (user !== "Me"){
            return {
                image: <img src="https://image.flaticon.com/icons/png/512/2115/2115916.png" alt="grandpybot" />,
                class: ""
            }
        }
        return {image: "", class: "message-personal"}
    }

    const show_map = (position) => {
        const Marker = ({ text }) => <div className="pin bounce">{text}<div className="pulse"></div></div>;
        const center = {
            "lng": Number(position.lng.toFixed(3)),
            "lat": Number(position.lat.toFixed(3))
        }

        handleUpdateKey()

        if (apiKey === null) {
            return (null);
        }

        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey, language: "fr"}}
                    options={{ mapTypeControl: false, scrollwheel: false, panControl: false }}
                    defaultCenter={center}
                    defaultZoom={15}
                >
                    <Marker lat={position.lat} lng={position.lng} />
                </GoogleMapReact>
            </div>
        );
    }

    const map = "position" in message ? show_map(message.position) : ""
    const messageProperties = get_properties(message.user)

    return (
        <div className={`message new ${messageProperties.class}`}>
            <figure className="avatar">
                {messageProperties.image}
            </figure>
            {map}
            {message.text}
            <div className="timestampcheckmark">
                <div className="timestamp">{message.hour}</div>
                <div className="checkmark-read">✓✓</div>
            </div>
        </div>
    )
}

export default Message;
