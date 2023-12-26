import Actor from './actor'

function GameGrid() {
    return (
        <>
            <div className='HelloWorld'><Actor /></div>
            <h2>I too am a gamer</h2>
            <h1>I'm a gamer</h1>
            <div>
                <span></span>
                <button>↑</button>
                <span></span>
            </div>
            <div>
                <button>←</button>
                <button></button>
                <button>→</button>
            </div>
            <div>
                <span></span>
                <button>↓</button>
                <span></span>
            </div>
        </>
    );
}

function onUpArrowClick() {
    
}
export default GameGrid;