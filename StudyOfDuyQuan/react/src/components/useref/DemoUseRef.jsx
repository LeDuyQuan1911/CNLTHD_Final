import React from 'react';

const DemoUseRef = () => {
    // khi dung ref thi ref thay doi thi component khong bi anh huong
    // const inputRef, abcRef = React.useRef(initialValue)
    const countRef = React.useRef(0)
    // truy xuat gia tri cua ref
    console.log(countRef.current)
    // update gia tri cua ref
    countRef.current = 10
    return (
        <div>
            
        </div>
    );
};

export default DemoUseRef;