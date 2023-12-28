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
        if (gameState.playerIndex > 19 && collisionChecker(gameState.playerIndex, -10, gameState.actorType)) {
            playerMovement(-10);
        }
    }

    function onDownArrowClick() {
        if (gameState.playerIndex < 80 & collisionChecker(gameState.playerIndex, 10, gameState.actorType)) {
            playerMovement(10);
        }
    }
    function onRightArrowClick() {
        if (gameState.playerIndex % 10 !== 8 & collisionChecker(gameState.playerIndex, 1, gameState.actorType)) {
            playerMovement(1);
        }
    }
    function onLeftArrowClick() {
        if (gameState.playerIndex % 10 !== 1 & collisionChecker(gameState.playerIndex, -1, gameState.actorType)) {
            playerMovement(-1);
        }
    }

    function collisionChecker(index, direction, type) {
        console.log("CollisionChecker: " + index + " | " + direction + " | " + type + " | " + gameState.currentMapData[index+direction].type);
        switch (gameState.currentMapData[index + direction].type) {
            case "e_air":
                return true;
            case "e_wal":
                return false;
            case "e_blu":
                if (type === "blue") {
                    return moveBlock(index, direction);
                } else {
                    return false;
                }
            case "e_org":
                if (type === "orange") {
                    return moveBlock(index, direction);
                } else {
                    return false;
            }
            case "e_bgl":
                if (type === "e_blu") {
                    gameState.currentMapData[index+direction].type = "e_air";
                }
                return true;
            case "e_ogl":
                if (type === "e_org") {
                    gameState.currentMapData[index+direction].type = "e_air";
                }
                return true;
        }
    }

    function moveBlock(index, direction) {
        console.log("MoveBlock: " + index + " | " + direction);
        let blockIndex = index + direction;
        let nextIndex = blockIndex + direction;
        let blockType = gameState.currentMapData[blockIndex].type;
        if (collisionChecker(blockIndex, direction, blockType) === false) {
            return false;
        }
        // if ((blockType === "e_blu" && gameState.currentMapData[nextIndex].type === "e_bgl")
        //     || (blockType === "e_org" && gameState.currentMapData[nextIndex].type === "e_ogl")) {
        //     console.log("Clear!");
        //     gameState.currentMapData[blockIndex] = "e_air";
        // } else {
        //     gameState.currentMapData[nextIndex] = blockType;
        // }
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