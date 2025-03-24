import React from 'react';

const Cell = (props) => {
    return (
        <div className='game-cell border border-black' onClick={props.onClick}>
            {props.value}
        </div>
    );
};

export default Cell;