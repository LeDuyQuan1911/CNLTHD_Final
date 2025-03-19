import React from 'react';
import Cell from "./Cell"
const Board = () => {
    return (
        <div className="game-board w-[500px] m-[25px] h-[500px] border border-black grid grid-cols-3 grid-rows-3">
            {
                Array(9).fill(0).map((item,index)=>(
                    <Cell key={index}></Cell>
                ))
            }
        </div>
    );
};

export default Board;
