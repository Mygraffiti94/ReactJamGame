import "../App.css"
import cyborg from "../assets/cyborg-face.png"
import warlord from "../assets/warlord-helmet.png"

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
    let image;
    if (props.src === 1) {
        image = cyborg;
    }
    else {
        image = warlord
    }

    return (   
        <>
            <img src={image} style={style} alt="Player One"/>
            </> 
        )
    }