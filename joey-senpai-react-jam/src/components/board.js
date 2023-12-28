import React, { useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import Actor from "./actor"


export default function Board() {
    const [gameState, setGameState] = useState({xCoord: 0, yCoord: 0, actorType: 'blue'});
    // Merge below states into gameState
    const [playerOne, setPlayerOne] = useState({xCoord: 0, yCoord: 0, isActive: true})
    const [playerTwo, setPlayerTwo] = useState({xCoord: 0, yCoord: 0, isActive: false})
    // TODO Set collision decisions
    const Sprite = () => {
        return (
            <Actor />
        )
    }
    

    function changeCharacter() {
        console.log("Changed Character!");
    }

    function onUpArrowClick() {
        if (gameState.yCoord > 2) {
            setGameState(prevState => ({
                ...prevState,
                yCoord: prevState.yCoord - 1
            }));
    }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }

    function onDownArrowClick() {
        if (gameState.yCoord < 8) {
        setGameState(prevState => ({
            ...prevState,
            yCoord: prevState.yCoord + 1
        }));
        }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }
    function onRightArrowClick() {
        if (gameState.xCoord < 8)
        setGameState(prevState => ({
            ...prevState,
            xCoord: prevState.xCoord + 1
        }));
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }
    function onLeftArrowClick() {
        if (gameState.xCoord > 2) {
        setGameState(prevState => ({
            ...prevState,
            xCoord: prevState.xCoord - 1
        }));
    }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }

    return (
        <div>
            <GameGrid
                x={gameState.xCoord}
                y={gameState.yCoord}
            />
            <GameController 
                leftClick={onLeftArrowClick}
                rightClick={onRightArrowClick}
                upClick={onUpArrowClick}
                downClick={onDownArrowClick}
                changeCharacter={changeCharacter}
            /> 
        
        </div>
    );
}