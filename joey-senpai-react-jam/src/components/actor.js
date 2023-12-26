import "../App.css"
import cyborg from "../assets/cyborg-face.png"

import React from "react"

export default function Actor(props) {
    // game state?
    // movement

    return (    
            <img src={cyborg} className="someCharacter" style={{margin: props.top}} alt="Player One"/>
        )
    }