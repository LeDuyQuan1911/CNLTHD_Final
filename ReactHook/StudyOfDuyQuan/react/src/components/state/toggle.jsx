// stateless functional component -> component nhungw khoong su dung state
// stateful functional component -> component su dung state     

import React, { useState } from "react";

export const Toggle = () => {
  const [todos, setTodos] = useState(["Bài tập 1", "Bài tập 2"]);

  return (
    <div>
        <h1>Danh sach cac bai tap</h1>
        <ul>
            {todos.map((todo)=>(
                    <li>{todo}</li>
            ))}
        </ul>       
        <div onClick={()=>{setTodos([...todos, `Bai tap ${todos.length + 1}`])}}>
            Click day de tang luong bai tap
        </div>
    </div>
  );
};
