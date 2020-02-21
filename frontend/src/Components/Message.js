import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
// Contexts
import ApiKeyContext from "../Contexts/ApiKeyContext"



const get_properties = (user) => {
    if (user !== "Me"){
        return {
            image: <img src="https://image.flaticon.com/icons/png/512/2115/2115916.png" alt="grandpybot" />,
            class: ""
        }
    }
    return {image: "", class: "message-personal"}
}

const show_map = (position, apiKey) => {
    const Marker = ({ text }) => <div className="pin bounce">{text}<div className="pulse"></div></div>;
    const center = {
        "lng": Number(position.lng.toFixed(3)),
        "lat": Number(position.lat.toFixed(3))
    }
    const mapStyles = {
        width: '400px',
        height: '50vh'
    };
    
    return (
        <div style={mapStyles}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: apiKey,
                    language: "fr"
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
    );
}


const Message = ({ message }) => {
    const apiKeyContextValue = useContext(ApiKeyContext)
    let messageProperties = get_properties(message.user)
    let map = ""
    if ("position" in message){
        map = show_map(message.position, apiKeyContextValue.apiKey)
        apiKeyContextValue.updateApiKey("")
    }

    return (
        <div className={`message new ${messageProperties.class}`}>
            <figure className="avatar">
                {messageProperties.image}
            </figure>
            {map}
            {message.text}
            <div className="timestamp">{message.hour}</div>
            <div className="checkmark-read">✓✓</div>
        </div>
    )
}

export default Message;
