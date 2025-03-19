import React from 'react';

const Cell = (props) => {
    const {value,onClick} = props
    console.log(value,onClick)
    return (
        <div             className='game-cell flex items-center justify-center text-[40px] border border-black cursor-pointer' onClick={props.onClick}>
            {props.value}
        </div>
    );
};

export default Cell;