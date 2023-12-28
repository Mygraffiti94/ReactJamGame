import "../App.css"
import cyborg from "../assets/cyborg-face.png"

import React from "react"

export default function Actor(props) {
    // game state?
    // movement    

    const style = {
        gridColumn: props.x,
        gridRow: props.y,
        position: "relative",
        height: "25px",
        width: "25px",
        zIndex: 2,
    };

    return (   
        <>
            <img src={cyborg} style={style} alt="Player One"/>
            </> 
        )
    }