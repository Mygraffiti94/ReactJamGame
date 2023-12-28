import Actor from './actor'
import React from "react"
import './gameGrid.css';
import { testLevel } from '../assets/mapData';
import Board from './board';

function GameGrid(props) {

    const gridData = testLevel;
    const gridArr = drawGrid();

      const handleClick = (index) => {
        console.log("Click! " + index);
      };

    function drawGrid() {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(<div className="cell"></div>);
        }

        return arr;
    }


    return (
        <>
            <h1>I'm a gamer</h1>
            
            <div className="center">
                <div className="interactable-grid">
                    {gridData.map((item, index) => {
                        switch (item.type) {
                            case "e_wal":
                                return <div className="wall"></div>;
                            case "e_air":
                                return <div className="air"></div>;
                            case "e_blu":
                                return <div className="blue-block"></div>;
                            case "e_org":
                                return <div className="orange-block"></div>;
                            default:
                                break;
                        }
                    })}
                <Actor
                    x={props.x}
                    y={props.y}
                />
                </div>
            </div>

        </>
    );
}



export default GameGrid;