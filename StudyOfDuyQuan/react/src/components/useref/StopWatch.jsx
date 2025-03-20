import React, { useEffect, useState } from 'react';

const StopWatch = () => {

    const watchRef = React.useRef(0)
    const [count,setCount] = useState(0)

    const handleStart = () =>{
        if(watchRef.current){
            return;
        }
        else{ 
            watchRef.current = setInterval(()=>{
                setCount(counter => counter + 1);
            },1000)
         }
    }

    const handleStop = () => {
        clearInterval(watchRef.current)
        watchRef.current = 0;
        setCount(0)
    }

    useEffect(()=>{
        return () => clearInterval(watchRef.current)
    })

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleStart}>Up</button>
            <button onClick={handleStop}>Down</button>
        </div>
    );
};

export default StopWatch;