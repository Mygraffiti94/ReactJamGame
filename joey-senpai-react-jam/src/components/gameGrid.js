import Actor from './actor'
import React from "react"

function GameGrid() {
    console.log('Console says hi!')
    const [isPlayerOne, setPlayer] = React.useState("yes")
    const [oneCurrentTop, setTop] = React.useState(0)
    console.log(isPlayerOne)

    function changeCharacter() {
        // TODO Set up a state
        setPlayer("no")
    }
    
    function onUpArrowClick() {
        console.log("Up arrow click")
        setTop(100)
        
    }
    function onLeftArrowClick() {
        console.log("Left arrow click")
        
    }
    function onRightArrowClick() {
        console.log("Right arrow click")
        
    }
    function onBottomArrowClick() {
        console.log("Bottom arrow click")
        setTop(0)
    }

    return (
        <>
            <Actor top={oneCurrentTop}/>
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