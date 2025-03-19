import React, { memo, useState } from 'react'

const Counter = memo(() => {
    const [info, setInfo] = useState({
        firstName:"Tran",
        lastName:"tuan",
    })
  return (
    <div>
        <input type='text' name='firstName' value={info.value}
        onChange={(e)=> setInfo(...info,firstName : e.target.value)}
        >

        </input>
    </div>
  )
})

export default Counter