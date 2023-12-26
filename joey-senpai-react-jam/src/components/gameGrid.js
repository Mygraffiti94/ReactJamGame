import Actor from './actor'

function GameGrid() {
    console.log('Console says hi!')
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
                <button></button>
                <button onClick={onRightArrowClick}>→</button>
            </div>
            <div>
                <span></span>
                <button onClick={Actor.onBottomArrowClick}>↓</button>
                <span></span>
            </div>
        </>
    );
}

function onUpArrowClick() {
    
}
function onLeftArrowClick() {
    
}
function onRightArrowClick() {
    console.log("Sanity check")
    
}
function onBottomArrowClick() {
    console.log("testing how functions work in Javascript")
}

export default GameGrid;