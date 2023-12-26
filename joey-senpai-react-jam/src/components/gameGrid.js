import Actor from './actor'
import React from "react"

function GameGrid() {
    console.log('Console says hi!')
    const [isPlayerOne, setPlayer] = React.useState("yes")
    console.log(isPlayerOne)

    function changeCharacter() {
        setPlayer("no")
    }
    
    function onUpArrowClick() {
        console.log("Up arrow click")
        
    }
    function onLeftArrowClick() {
        console.log("Left arrow click")
        
    }
    function onRightArrowClick() {
        console.log("Right arrow click")
        
    }
    function onBottomArrowClick() {
        console.log("Bottom arrow click")
    }

    return (
        <>
            <Actor />
            <h1>I'm a gamer</h1>
            <div>
                <span></span>
                <button onClick={onUpArrowClick}>↑</button>
                <span></span>
            </div>
            <div>
                <button onClick={onLeftArrowClick}>←</button>
                <button onClick={changeCharacter}>Change Character</button>
                <button onClick={onRightArrowClick}>→</button>
            </div>
            <div>
                <span></span>
                <button onClick={onBottomArrowClick}>↓</button>
                <span></span>
            </div>
        </>
    );
}



export default GameGrid;