import { useState } from "react";
import { Sprite } from '@pixi/react';

function GameController(props) {

    return (
        <>
            <div>
                <button onClick={props.upClick}>↑</button>
                <div></div>
                <button onClick={props.leftClick}>←</button>
                <button onClick={props.changeCharacter}> <Sprite image="https://pixijs.io/pixi-react/img/bunny.png"/>Change Character</button>
                <button onClick={props.rightClick}>→</button>
                <div></div>
                <button onClick={props.downClick}>↓</button>
            </div>
        </>
    );
}

export default GameController;