import React, { useEffect, useRef, useState } from 'react';

const TextAreaResize = () => {
    const [text, setText] = useState("demo")
    const textareaRef = useRef(null)
    const [textareaHeight, setTextareaHeight] = useState("auto")
    const [parentHeight, setparentHeight] = useState("auto")

    const handleChange = (event) => {
        setTextareaHeight("auto")
        setText(event.target.value)
    }

    useEffect(()=>{
        setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`)
    },[text])

    return (
        <div className='p-5' style={{minHeight:parentHeight,}}>
            <textarea className='w-full max-w-[400px] transition-all overflow-hidden p-5 rounded-lg border border-gray-100'
            placeholder='Please enter your content'
            value={text}
            ref={textareaRef}
            style={{
                height: textareaHeight,
            }}
            onChange={handleChange}
            >
            
            </textarea>
        </div>
    );
};

export default TextAreaResize;