import React from 'react';
import Cell from "./Cell";
import { calculateWinner } from '../../Helper';

const Board = (props) => {
    const cells = [null, null, null, "X", "X", "X", null, null, null];

    console.log(calculateWinner(cells));

    return (
        <div className="game-board w-[500px] m-[25px] h-[500px] border border-black grid grid-cols-3 grid-rows-3">
            {props.cells.map((item, index) => (
                <Cell key={index} value={item} onClick={()=>props.onClick(index)}/>
            ))}
        </div>
    );
};

export default Board;
