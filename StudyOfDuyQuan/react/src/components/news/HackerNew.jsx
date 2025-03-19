import axios from 'axios';
import React, { useEffect, useState } from 'react';
// http://hn.algolia.com/api/v1/search?query=
const HackerNew = () => {
    const [data,setData] = useState()

    useEffect(()=>{
        axios.get("http://hn.algolia.com/api/v1/search?query=")
        .then((response)=>{
            console.log(response)
        })
        .catch()
    },[data])

    return (
        <div>
            
        </div>
    );
};

export default HackerNew;