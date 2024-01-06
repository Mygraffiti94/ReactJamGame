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
                                         <li>Pushing a BLUE block into a PURPLE block will clear the PURPLE block</li>
                                         <li>Pushing an ORANGE block into a PINK block will clear the PINK block</li>
                                         <li>Clearing all the PURPLE and PINK blocks </li>
                                    </div>
                                </div>
                            : <Board />
            }
        </>
    )

}

export default Menu;