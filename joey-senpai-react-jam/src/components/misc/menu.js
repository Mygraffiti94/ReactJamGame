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
                                         <li>Use the arrow buttons to move your <b>SOKOBORO</b></li>
                                         <li>You can switch between your <b>SOKOBOROs</b></li>
                                         <li>A <b>SOKOBORO</b> can only move their matching block </li>
                                         <li>Pushing an empty TRIANGLE block into a black TRIANGLE block will clear the black TRIANGLE block</li>
                                         <li>Pushing an empty PENTAGON block into a black PENTAGON block will clear the black PENTAGON block</li>
                                         <li>Clearing all the black TRIANGLE and black PENTAGON blocks will beat the level</li>
                                         <li>The <b>SOKOBORO</b>s will need to work together to escape this SOKOMAZE</li>
                                    </div>
                                </div>
                            : <Board />
            }
        </>
    )

}

export default Menu;