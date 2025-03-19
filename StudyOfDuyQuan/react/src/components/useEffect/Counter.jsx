import React, { memo, useEffect, useState } from 'react';

const Counter = memo(() => {
    const [info, setInfo] = useState({
        firstName: "Tran",
        lastName: "Tuan",
    });

    const [form,setForm] = useState({
      firstName:"", lastName: ""
    })

    const handleChange = (e) =>{
      setForm(...form, [e.target.name] = [e.target.value])
    }
    

    useEffect(()=>{
      console.log(info)
    },[info])

    return (
        <div>
            <input 
                type="text" 
                name="firstName" 
                value={form.firstName}
                onChange={handleChange}
            />
            <input type='text' name='lastName' value={form.lastName} onChange={handleChange}></input>
        </div>
    );
});

export default Counter;
