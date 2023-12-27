import GameController from "../controller/gameController";
import './gameGrid.css';
import { useState } from "react";

function GameGrid() {
    const maxGridSize = 25;
    const gridList = [];

    const handleClick = () => {

    };
  
    const renderCell = () => (
      <div className="cell" onClick={() => handleClick()}>
        {}
      </div>
    );

    return (
        <>
            <div className="center">
                <div>Gaming</div>
                <div className="interactable-grid">
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                    {renderCell()}
                </div>
                <GameController></GameController>
            </div>
        </>
    );
}

export default GameGrid;