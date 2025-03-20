import React from 'react';

const DemoUseRef2 = () => {
    // const [count,setCount] = React.useState(0)
    const countRef = React.useRef(0)
    const handle = () => {
        const updateCount = countRef + 1;
        console.log(`Times: ${updateCount}`)
        countRef.current++;
    }
    return (
        <div>
            <button onClick={handle}>Click me!!!</button>
        </div>
    );
};

export default DemoUseRef2;