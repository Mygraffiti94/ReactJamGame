import Actor from './actor'
import React from "react"
import './gameGrid.css';

function GameGrid(props) {
    const gridData = props.mapData[0];
    return (
        <>
            <h1>Sokobros</h1>
            
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
                            case "e_bgl":
                                return <div className="blue-goal"></div>;
                            case "e_org":
                                return <div className="orange-block"></div>;
                            case "e_ogl":
                                return <div className="orange-goal"></div>;
                            case "e_act":
                                return <div> <Actor></Actor></div>
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