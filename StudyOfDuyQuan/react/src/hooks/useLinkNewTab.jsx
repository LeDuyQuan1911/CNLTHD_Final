import { useEffect, useRef } from "react"

export default function useLinkNewTab (){
    const contentRef = useRef(null)
    useEffect(()=>{
        if(contentRef){
            const links = contentRef.current.querySelectorAll("a");
            links.length > links.forEach((item)=>item.setAttribute("target","_blank "))
        }
    })
    return (
        <div>
            
        </div>
    )
}