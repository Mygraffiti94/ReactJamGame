import React, { useEffect, useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import Actor from "./actor"
import { testLevel } from '../assets/mapData';

export default function Board() {
    const [gameState, setGameState] = useState({mapData: [testLevel], currentMapData: testLevel, actorType: 'blue', playerOne: {xCoord: 1, yCoord: 10,  playerIndex: 11, prevIndex: 11}, playerTwo: {xCoord: 2, yCoord: 10,  playerIndex: 12, prevIndex: 12}});
    // Merge below states into gameState
    const [gridUpdateCounter, setGridUpdateCounter] = useState(0);
    // TODO Set collision decisions


    function changeCharacter() {
        if (gameState.actorType === "blue")
            gameState.actorType = "orange";
        else
            gameState.actorType = "blue";
    }

    function onUpArrowClick() {
        if (gameState.actorType === "blue") {
            if (gameState.playerOne.playerIndex > 19 && collisionChecker(gameState.playerOne.playerIndex, -10)) {
                playerMovement(-10);
            }
        }
        else {
            if (gameState.playerTwo.playerIndex > 19 && collisionChecker(gameState.playerTwo.playerIndex, -10)) {
                playerMovement(-10);
            }
        }
    }

    function onDownArrowClick() {
        if (gameState.actorType === "blue") {
            if (gameState.playerOne.playerIndex < 80 & collisionChecker(gameState.playerOne.playerIndex, 10)) {
                playerMovement(10);
            }
        }
        else {
            if (gameState.playerTwo.playerIndex < 80 & collisionChecker(gameState.playerTwo.playerIndex, 10)) {
                playerMovement(10);
            }

        }
    }
    function onRightArrowClick() {
        if (gameState.actorType === "blue") {
            if (gameState.playerOne.playerIndex % 10 !== 8 & collisionChecker(gameState.playerOne.playerIndex, 1)) {
                playerMovement(1);
            }
        }
        else {
            if (gameState.playerTwo.playerIndex % 10 !== 8 & collisionChecker(gameState.playerTwo.playerIndex, 1)) {
                playerMovement(1);
            }
        }
    }
    function onLeftArrowClick() {
    if (gameState.actorType === "blue") {
        if (gameState.playerOne.playerIndex % 10 !== 1 & collisionChecker(gameState.playerOne.playerIndex, -1)) {
            playerMovement(-1);
        }
    }
    else {
        if (gameState.playerTwo.playerIndex % 10 !== 1 & collisionChecker(gameState.playerTwo.playerIndex, -1)) {
            playerMovement(-1);
        }
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
        if (gameState.actorType === "blue") {
            setGameState(prevState => ({
                ...prevState,
                playerOne: {
                ...prevState.playerOne,
                prevIndex: prevState.playerOne.playerIndex,
                playerIndex: prevState.playerOne.playerIndex + direction
                }
            }))
            console.log(gameState)
            gameState.currentMapData[gameState.playerOne.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerOne.playerIndex] = {type: "e_act"};
        }
        else {
            setGameState(prevState => ({
                ...prevState,
                playerTwo: {
                ...prevState.playerTwo,
                prevIndex: prevState.playerTwo.playerIndex,
                playerIndex: prevState.playerTwo.playerIndex + direction
                }
            }))
            console.log(gameState)
            gameState.currentMapData[gameState.playerTwo.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerTwo.playerIndex] = {type: "e_act_2"};
        }
    }

    useEffect(() => {
        if (gameState.actorType === 'blue') {
        if (gameState.playerOne.playerIndex > 10) {
            gameState.currentMapData[gameState.playerOne.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerOne.playerIndex] = { type: "e_act" };
          }
        }
        else {
        if (gameState.playerTwo.playerIndex > 10) {
            gameState.currentMapData[gameState.playerTwo.prevIndex] = {type: "e_air"};
            gameState.currentMapData[gameState.playerTwo.playerIndex] = { type: "e_act_2" };
          }
        }
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
      }, [gameState.playerOne.playerIndex,
        gameState.playerTwo.playerIndex,
        gameState.currentMapData,]); // useEffect will run after gameState changes

    return (
        <div>
            <GameGrid
                playerOneX={gameState.playerOne.xCoord}
                playerOneY={gameState.playerOne.yCoord}
                playerOnePlayerIndex={gameState.playerOne.playerIndex}
                playerTwoX={gameState.playerTwo.xCoord}
                playerTwoY={gameState.playerTwo.yCoord}
                playerTwoPlayerIndex={gameState.playerTwo.playerIndex}
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