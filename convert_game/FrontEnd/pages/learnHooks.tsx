import { useEffect, useRef } from "react";

export default function tryCanvas(){
    const canvas = useRef(null);
    // const[user, changeUser] = useState({
    //  x:0,
    //  y:(200 * 100) / 2 ,
    // })
    useEffect(()=>{
        if(canvas.current)
        {
            const ctx: HTMLCanvasElement = canvas.current;
            const context = ctx.getContext("2d");
        }
    })
    return <canvas width={600} height={400} ref={canvas} style={{border:"1px solid #c3c3c3"}}></canvas>
}


// export default function learnHooks(){
//     const [data, setdata] = useState("hamo");
//     return  (    
//         <div>
//             <h1>{data}</h1>
//             <button onClick={() => setdata("KHALID")} >Change</button>
//         </div>
//     )
// }
