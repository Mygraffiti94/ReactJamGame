import React, { useEffect, useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import Actor from "./actor"
import { testLevel } from '../assets/mapData';

export default function Board() {
    const [gameState, setGameState] = useState({mapData: [testLevel], currentMapData: testLevel, xCoord: 1, yCoord: 10, actorType: 'blue', playerIndex: 11, prevIndex: 11});
    // Merge below states into gameState
    const [playerOne, setPlayerOne] = useState({xCoord: 0, yCoord: 0, isActive: true})
    const [playerTwo, setPlayerTwo] = useState({xCoord: 0, yCoord: 0, isActive: false})
    const [gridUpdateCounter, setGridUpdateCounter] = useState(0);
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
        console.log("On Index: " + gameState.playerIndex);
        if (gameState.playerIndex > 19) {
            gameState.currentMapData[gameState.playerIndex] = {type: "e_air"};
            playerMovement(-10);
        }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }

    function onDownArrowClick() {
        if (gameState.yCoord < 10) {
            setGameState(prevState => ({
                ...prevState,
                yCoord: prevState.yCoord + 1
            }));
        }
        console.log("On Index: " + gameState.playerIndex);
        if (gameState.playerIndex < 90) {
            playerMovement(10);
        }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }
    function onRightArrowClick() {
        if (gameState.xCoord < 9)
        setGameState(prevState => ({
            ...prevState,
            xCoord: prevState.xCoord + 1
        }));
        console.log("On Index: " + gameState.playerIndex);
        if (gameState.playerIndex % 10 !== 8) {
            playerMovement(1);
        }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }
    function onLeftArrowClick() {
        if (gameState.xCoord > 2) {
        setGameState(prevState => ({
            ...prevState,
            xCoord: prevState.xCoord - 1
        }));
    }
        console.log("On Index: " + gameState.playerIndex);
        if (gameState.playerIndex % 10 !== 1) {
            playerMovement(-1);
        }
        console.log("X: " + gameState.xCoord + " Y: " + gameState.yCoord);
    }

    function playerMovement(direction) {
        console.log("Moving player");
        setGameState(prevState => ({
            ...prevState,
            prevIndex: prevState.playerIndex,
            playerIndex: prevState.playerIndex + direction
        }))
        gameState.currentMapData[gameState.prevIndex] = {type: "e_air"};
        gameState.currentMapData[gameState.playerIndex] = {type: "e_act"};
    }

    useEffect(() => {
        console.log("Use effect On Index: " + gameState.playerIndex);
    
        if (gameState.playerIndex > 10) {
            gameState.currentMapData[gameState.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerIndex] = { type: "e_act" };
          }
        console.log("Use effect X: " + gameState.xCoord + " Y: " + gameState.yCoord);
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
      }, [gameState.xCoord,
        gameState.yCoord,
        gameState.playerIndex,
        gameState.mapData,]); // useEffect will run after gameState changes

    return (
        <div>
            <GameGrid
                x={gameState.xCoord}
                y={gameState.yCoord}
                playerIndex={gameState.playerIndex}
                mapData={gameState.mapData}
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