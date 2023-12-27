import { useState } from "react";
import { Sprite } from '@pixi/react';

function GameController() {
    const [gameState, setGameState] = useState({xCoord: 0, yCoord: 0, actorType: 'blue'});
 
    function onUpArrowClick() {
        gameState.yCoord++;
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }

    return (
        <>
            <div>
                <button onClick={onUpArrowClick}>↑</button>
                <div></div>
                <button>←</button>
                <button> <Sprite image="https://pixijs.io/pixi-react/img/bunny.png"/></button>
                <button>→</button>
                <div></div>
                <button>↓</button>
            </div>
        </>
    );
}

export default GameController;