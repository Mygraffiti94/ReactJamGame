import Actor from './actor'
import React from "react"
import './gameGrid.css';

function GameGrid(props) {
    const gridData = props.mapData[props.level].mapData;
    const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.mapData[props.level].mapX}, 25px)`,
    gridTemplateRows: `repeat(${props.mapData[props.level].mapY}, 25px)`,
    gridGap: "0px",
    }
    //className="interactable-grid"
    return (
        <>
            <h1>Sokobros</h1>
            <h2>Level: {props.level}</h2>
            
            <div className="center">
                <div style={style}>
                    {gridData.map((item) => {
                        switch (item.type) {
                            case "e_wal":
                                return <div className="wall"></div>;
                            case "e_air":
                                return <div className="air"></div>;
                            case "e_blu":
                                return <div className="blue-block">△</div>;
                            case "e_bgl":
                                return <div className="blue-goal">▲</div>;
                            case "e_org":
                                return <div className="orange-block">⬠</div>;
                            case "e_ogl":
                                return <div className="orange-goal">⬟</div>;
                            case "e_one":
                                return <div> <Actor src={1}></Actor></div>
                            case "e_two":
                                return <div> <Actor src={2}></Actor></div>
                            default:
                                break;
                        }
                    })}
                </div>
            </div>

        </>
    );
}



export default GameGrid;