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