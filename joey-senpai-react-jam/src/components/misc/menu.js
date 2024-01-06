import React, { useState } from "react"
import Board from "../board"

function Menu() {

    const [gameMode, setGameMode] = useState(1)
    function startGame() {
        if (gameMode === 1) {
            setGameMode(2)
        }
    }

    return (
        <>
            {gameMode === 1 ? <div><div><h1>Sokobros</h1><button onClick={startGame}>Start!</button></div>
                                    <div><h2>Instructions</h2>
                                         <li>Use the arrow buttons to move your SOKOBORO</li>
                                         <li>You can switch between your SOKOBOROs</li>
                                         <li>A SOKOBRO can only move his matching block </li>
                                         <li>Pushing an empty TRIANGLE block into a black TRIANGLE block will clear the black TRIANGLE block</li>
                                         <li>Pushing an empty PENTAGON block into a black PENTAGON block will clear the black PENTAGON block</li>
                                         <li>Clearing all the black TRIANGLE and black PENTAGON blocks will clear the level</li>
                                    </div>
                                </div>
                            : <Board />
            }
        </>
    )

}

export default Menu;