import React, { Component, useEffect, useState } from "react"
import GameController from "./controller/gameController"
import GameGrid from "./gameGrid";
import { testLevel, LEVEL_ZERO, LEVEL_ONE } from '../assets/mapData';

export default function Board() {
    const [gameState, setGameState] = useState({mapData: [LEVEL_ZERO, LEVEL_ONE], currentMapData: LEVEL_ZERO.mapData, mapClearCon: 2, clearConCounter: 0, actorType: 'one', playerOneIndex: 11, playerOnePrevIndex: 11, playerOnePrevType: "e_air", playerTwoIndex: 18, playerTwoPrevIndex: 18, playerTwoPrevType: "e_air", level: 0, resetState: 0});
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

    function resetGame() {
        setGameState(prevState => ({
            ...prevState,
            resetState: 1,
        }))

    }

    function collisionChecker(index, direction, type) {
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
                    level: prevState.level+1
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
        if (gameState.resetState === 1) {
            gameState.resetState = 0
            gameState.currentMapData[gameState.playerOneIndex] = { type: "e_air" }
            gameState.currentMapData[gameState.playerTwoIndex] = { type: "e_air" }
            for (let i= 0; i < gameState.currentMapData.length; i++) {
                switch (gameState.currentMapData[i].type) {
                case "e_blu":
                    gameState.currentMapData[i].type = 'e_air'
                case "e_org":
                    gameState.currentMapData[i].type = 'e_air'
                }
            }
            for (let i=0; i < gameState.mapData[gameState.level].initialBlueBlocks.length; i++) {
                gameState.currentMapData[gameState.mapData[gameState.level].initialBlueBlocks[i]] = { type: "e_blu" }
            }
            for (let i=0; i < gameState.mapData[gameState.level].initialOrangeBlocks.length; i++) {
                gameState.currentMapData[gameState.mapData[gameState.level].initialOrangeBlocks[i]] = { type: "e_org" }
            }
            for (let i=0; i < gameState.mapData[gameState.level].initialBlueDrop.length; i++) {
                gameState.currentMapData[gameState.mapData[gameState.level].initialBlueDrop[i]] = { type: "e_bgl" }
            }
            for (let i=0; i < gameState.mapData[gameState.level].initialOrangeDrop.length; i++) {
                gameState.currentMapData[gameState.mapData[gameState.level].initialOrangeDrop[i]] = { type: "e_ogl" }
            }
            gameState.playerOneIndex = gameState.mapData[gameState.level].initialPlayerOneIndex;
            gameState.playerOnePrevIndex = gameState.mapData[gameState.level].initialPlayerOneIndex;
            gameState.playerOnePrevType = "e_air";
            gameState.actorType = "one";
            gameState.playerTwoIndex = gameState.mapData[gameState.level].initialPlayerTwoIndex;
            gameState.playerTwoPrevIndex = gameState.mapData[gameState.level].initialPlayerTwoIndex;
            gameState.clearConCounter = 0;
            gameState.currentMapData[gameState.playerOneIndex] = { type: "e_one" }
            gameState.currentMapData[gameState.playerOneIndex] = { type: "e_two" }
        }
        else if (gameState.actorType === "one") {
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
            if (gameState.currentMapData.mapData) {
                gameState.currentMapData = gameState.currentMapData.mapData;
            }
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
            // Get rid of previous player tokens
            gameState.currentMapData[gameState.playerOneIndex].type = "e_air";
            gameState.currentMapData[gameState.playerTwoIndex].type = "e_air";
            // Reset game state for next level
            gameState.clearConCounter = 0;
            gameState.actorType = "one";
            gameState.currentMapData = gameState.mapData[gameState.level].mapData;
            gameState.playerOneIndex = gameState.mapData[gameState.level].playerOneIndex;
            gameState.playerTwoIndex = gameState.mapData[gameState.level].playerTwoIndex;
            gameState.currentMapData[gameState.playerOneIndex] = {type: "e_one"};
            gameState.currentMapData[gameState.playerTwoIndex] = {type: "e_two"};
        }
        setGridUpdateCounter((prevCounter) => prevCounter + 1);
    
          }, [gameState.playerOneIndex,
        gameState.playerTwoIndex,
        gameState.currentMapData,
        gameState.resetState]); // useEffect will run after gameState changes
    

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
                resetGame={resetGame}
            /> 
        
        </div>
    );
}