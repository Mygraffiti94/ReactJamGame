import React, { useEffect, useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import Actor from "./actor"
import { testLevel } from '../assets/mapData';

export default function Board() {
    const [gameState, setGameState] = useState({mapData: [testLevel], currentMapData: testLevel, xCoord: 1, yCoord: 10, actorType: 'blue', playerOneIndex: 11, playerOnePrevIndex: 11, playerTwoIndex: 18, playerTwoPrevIndex: 18});
    const [gridUpdateCounter, setGridUpdateCounter] = useState(0);

    function changeCharacter() {
        if (gameState.actorType === "one")
            gameState.actorType = "two";
        else
            gameState.actorType = "one";
    }

    function onUpArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (gameState.playerOneIndex > 19 && collisionChecker(index, -10, gameState.actorType)) {
            playerMovement(-10, gameState.actorType);
        }
    }

    function onDownArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (gameState.playerOneIndex < 80 & collisionChecker(gameState.playerOneIndex, 10, gameState.actorType)) {
            playerMovement(10, gameState.actorType);
        }
    }
    function onRightArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (gameState.playerOneIndex % 10 !== 8 & collisionChecker(gameState.playerOneIndex, 1, gameState.actorType)) {
            playerMovement(1, gameState.actorType);
        }
    }
    function onLeftArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (gameState.playerOneIndex % 10 !== 1 & collisionChecker(gameState.playerOneIndex, -1, gameState.actorType)) {
            playerMovement(-1, gameState.actorType);
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
                if (type === "one") {
                    return moveBlock(index, direction);
                } else {
                    return false;
                }
            case "e_org":
                if (type === "two") {
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

    function playerMovement(direction, type) {
        console.log("Moving player");
        if (type === "one") {
            setGameState(prevState => ({
                ...prevState,
                playerOnePrevIndex: prevState.playerOneIndex,
                playerOneIndex: prevState.playerOneIndex + direction
            }))
            gameState.currentMapData[gameState.playerOnePrevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerOneIndex] = {type: "e_one"};
        } else {
            setGameState(prevState => ({
                ...prevState,
                playerTwoPrevIndex: prevState.playerTwoIndex,
                playerTwoIndex: prevState.playerTwoIndex + direction
            }))
            gameState.currentMapData[gameState.playerOnePrevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerOneIndex] = {type: "e_two"};            
        }
    }

    useEffect(() => {
        if (gameState.playerOneIndex > 10) {
            gameState.currentMapData[gameState.playerOnePrevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerOneIndex] = { type: "e_one" };
          }
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
      }, [gameState.playerOneIndex,
        gameState.currentMapData,]); // useEffect will run after gameState changes

    return (
        <div>
            <GameGrid
                x={gameState.xCoord}
                y={gameState.yCoord}
                playerIndex={gameState.playerOneIndex}
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