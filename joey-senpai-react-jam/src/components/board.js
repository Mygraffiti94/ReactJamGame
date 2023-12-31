import React, { Component, useEffect, useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import { testLevel, LEVEL_ONE } from '../assets/mapData';

export default function Board() {
    const [gameState, setGameState] = useState({mapData: [testLevel, LEVEL_ONE], currentMapData: testLevel, mapClearCon: 2, clearConCounter: 0, actorType: 'one', playerOneIndex: 11, playerOnePrevIndex: 11, playerOnePrevType: "e_air", playerTwoIndex: 18, playerTwoPrevIndex: 18, playerTwoPrevType: "e_air", level: 0});
    const [gridUpdateCounter, setGridUpdateCounter] = useState(0);

    function changeCharacter() {
        if (gameState.actorType === "one")
            gameState.actorType = "two";
        else
            gameState.actorType = "one";
    }

    function onUpArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (index > 19 && collisionChecker(index, -10, gameState.actorType)) {
            playerMovement(-10, gameState.actorType);
        }
    }

    function onDownArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (index < 80 & collisionChecker(index, 10, gameState.actorType)) {
            playerMovement(10, gameState.actorType);
        }
    }
    function onRightArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (index % 10 !== 8 & collisionChecker(index, 1, gameState.actorType)) {
            playerMovement(1, gameState.actorType);
        }
    }
    function onLeftArrowClick() {
        let index = gameState.actorType === "one" ? gameState.playerOneIndex : gameState.playerTwoIndex;
        if (index % 10 !== 1 & collisionChecker(index, -1, gameState.actorType)) {
            playerMovement(-1, gameState.actorType);
        }
    }

    function collisionChecker(index, direction, type) {
        console.log("CollisionChecker: " + index + " | " + direction + " | " + type + " | " + gameState.currentMapData[index+direction].type);
        switch (gameState.currentMapData[index + direction].type) {
            case "e_air":
            case "e_bgl":
            case "e_ogl":
                return true;
            case "e_blu":
                if (type === "one") {
                    return moveBlock(index+direction, direction);
                } else {
                    return false;
                }
            case "e_org":
                if (type === "two") {
                    return moveBlock(index+direction, direction);
                } else {
                    return false;
            }
            case "e_wal":
            default:
                return false;
        }
    }

    function moveBlock(index, direction) {
        let blockType = gameState.currentMapData[index].type;
        if (collisionChecker(index, direction, blockType) === false) {
            return false;
        }
        
        if (gameState.currentMapData[index+direction].type === "e_bgl"
            || gameState.currentMapData[index+direction].type === "e_ogl") {
            gameState.currentMapData[index].type = "e_air";
            gameState.currentMapData[index+direction].type = "e_air";
            gameState.clearConCounter += 1;
            if (gameState.clearConCounter >= gameState.mapClearCon) {
                setGameState(prevState => ({
                    ...prevState,
                    currentMapData: LEVEL_ONE
                }))
            }
        } else {
            gameState.currentMapData[index+direction].type = blockType;
        }
        return true;
    }

    function playerMovement(direction, type) {
        if (type === "one") {
            setGameState(prevState => ({
                ...prevState,
                playerOnePrevIndex: prevState.playerOneIndex,
                playerOneIndex: prevState.playerOneIndex + direction
            }))

        } else {
            setGameState(prevState => ({
                ...prevState,
                playerTwoPrevIndex: prevState.playerTwoIndex,
                playerTwoIndex: prevState.playerTwoIndex + direction
            }))      
        }
    }

    useEffect(() => {
        let index = 0;
        let prevIndex = 0;
        let prevType = "e_air";
        if (gameState.actorType === "one") {
            index = gameState.playerOneIndex;
            prevIndex = gameState.playerOnePrevIndex;
            prevType = gameState.playerOnePrevType;
            gameState.playerOnePrevType = gameState.currentMapData[index].type;
            if (prevType === "e_air" || prevType === "e_bgl" || prevType === "e_ogl") {
                gameState.currentMapData[prevIndex].type = prevType;
            } else {
                gameState.currentMapData[prevIndex].type = "e_air";
            }
            gameState.currentMapData[index] = { type: "e_one" };
            gameState.currentMapData[gameState.playerTwoIndex] = { type: "e_two" };
        } else {
            index = gameState.playerTwoIndex;
            prevIndex = gameState.playerTwoPrevIndex;
            prevType = gameState.playerTwoPrevType;
            gameState.playerTwoPrevType = gameState.currentMapData[index].type;
            if (prevType === "e_air" || prevType === "e_bgl" || prevType === "e_ogl") {
                gameState.currentMapData[prevIndex].type = prevType;
            } else {
                gameState.currentMapData[prevIndex].type = "e_air";
            }

            gameState.currentMapData[index] = { type: "e_two" };
            gameState.currentMapData[gameState.playerOneIndex] = { type: "e_one" };           
        }

        if (gameState.clearConCounter >= gameState.mapClearCon) {
            gameState.level += 1;
            gameState.currentMapData[gameState.playerOneIndex].type = "e_air";
            gameState.currentMapData[gameState.playerTwoIndex].type = "e_air";
            if (gameState.level === 1) {
                gameState.actorType = "one";
                gameState.currentMapData = LEVEL_ONE;
                gameState.playerOneIndex = 81;
                gameState.playerOnePrevIndex = 81;
                gameState.currentMapData[gameState.playerOneIndex] = {type: "e_one"};
                gameState.playerTwoIndex = 88;
                gameState.playerTwoPrevIndex = 88;
                gameState.currentMapData[gameState.playerTwoIndex] = {type: "e_two"};
                console.log(gameState.currentMapData);
            }
            gameState.clearConCounter = 0;
        }
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
      }, [gameState.playerOneIndex,
        gameState.playerTwoIndex,
        gameState.currentMapData]); // useEffect will run after gameState changes

    return (
        <div>
            <GameGrid
                mapData={gameState.mapData}
                level={gameState.level}
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