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
            {gameMode === 1 ? <div><h1>Sokobros</h1><button onClick={startGame}>Start!</button> </div>
                            : <Board />
            }
        </>
    )

}

export default Menu;