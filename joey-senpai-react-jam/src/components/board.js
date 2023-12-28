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
        if (gameState.actorType === "blue")
            gameState.actorType = "orange";
        else
            gameState.actorType = "blue";
    }

    function onUpArrowClick() {
        if (gameState.playerIndex > 19 && collisionChecker(gameState.playerIndex, -10)) {
            playerMovement(-10);
        }
    }

    function onDownArrowClick() {
        if (gameState.playerIndex < 80 & collisionChecker(gameState.playerIndex, 10)) {
            playerMovement(10);
        }
    }
    function onRightArrowClick() {
        if (gameState.playerIndex % 10 !== 8 & collisionChecker(gameState.playerIndex, 1)) {
            playerMovement(1);
        }
    }
    function onLeftArrowClick() {
        if (gameState.playerIndex % 10 !== 1 & collisionChecker(gameState.playerIndex, -1)) {
            playerMovement(-1);
        }
    }

    function collisionChecker(index, direction) {
        switch (gameState.currentMapData[index + direction].type) {
            case "e_air":
                return true;
            case "e_wal":
                return false;
            case "e_blu":
                if (gameState.actorType === "blue") {
                    return moveBlock(index, direction);
                } else {
                    return false;
                }
            case "e_org":
                if (gameState.actorType === "orange") {
                    return moveBlock(index, direction);
                } else {
                    return false;
            }
        }
    }

    function moveBlock(index, direction) {
        let blockIndex = index + direction;
        if (collisionChecker(blockIndex, direction) === false) {
            return false;
        }
        let blockType = gameState.currentMapData[blockIndex];
        gameState.currentMapData[blockIndex + direction] = blockType;
        return true;
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
        if (gameState.playerIndex > 10) {
            gameState.currentMapData[gameState.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerIndex] = { type: "e_act" };
          }
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
      }, [gameState.playerIndex,
        gameState.currentMapData,]); // useEffect will run after gameState changes

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