function GameController(props) {

    return (
        <>
            <div>
                <button onClick={props.upClick}>↑</button>
                <div></div>
                <button onClick={props.leftClick}>←</button>
                {
                    
                }
                <button onClick={props.changeCharacter}> <b>{props.actorType}</b> SOKOSWAP</button>
                <button onClick={props.rightClick}>→</button>
                <div></div>
                <button onClick={props.downClick}>↓</button>
                <div></div>
                <button onClick={props.resetGame}>Reset the Game</button>
            </div>
            <div>
                <button onClick={props.previousLevel}>←</button>
                <button onClick={props.nextLevel}>→</button>
            </div>
        </>
    );
}

export default GameController;