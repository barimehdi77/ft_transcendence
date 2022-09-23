import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import { paintGame, drawRect, drawText } from './drawing'

const Spectate = () => {
    const [data, setData]: any = useState(null);
    const [table, setTable] = useState(true);
    const canvasRef = useRef(null);
    const [gameActive, setActive] = useState(false);
    let canvas: HTMLCanvasElement;
    let ctx: any;

    if (typeof window !== "undefined") {
        console.log(window.innerWidth, " ", window.innerHeight);
        window.onresize = () => {
            if (canvasRef.current) {
                if (window.innerWidth > 1300) {
                    canvas.width = 600;
                    canvas.height = canvas.width / 2;
                }
                else if (window.innerWidth < 1300 && window.innerWidth > 600) {
                    canvas.width = 500;
                    canvas.height = canvas.width / 2;
                }
                else if (window.innerWidth < 600) {
                    canvas.width = 300;
                    canvas.height = canvas.width / 2;
                }
            }
        }
    }

    if (canvasRef.current) {
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        if (window.innerWidth > 1300) {
            canvas.width = 600;
            canvas.height = canvas.width / 2;
        }
        else if (window.innerWidth < 1300 && window.innerWidth > 600) {
            canvas.width = 500;
            canvas.height = canvas.width / 2;
        }
        else if (window.innerWidth < 600) {
            canvas.width = 300;
            canvas.height = canvas.width / 2;
        }
    }

    const updateplayers = (msg: string) => {
        console.log("update: ", msg);
        setData(JSON.parse(msg));
        setTable(true);
        setActive(false);
    }
    socket.off('updateplayers').on('updateplayers', updateplayers);

    const listOfPlayersPlaying = (msg: string) => {
        console.log("listOfPlayersPlaying: ", msg);
        setData(JSON.parse(msg));
    }
    socket.off('listOfPlayersPlaying').on('listOfPlayersPlaying', listOfPlayersPlaying);

    useEffect(() => {
        const getData = () => {
            socket.emit('listOfPlayersPlaying', (ret: any) => {
                console.log(ret);
                setData(ret);
            })
        }
        getData();
    }, [table]);

    const handlSpectateState = (state: string) => {
        if (gameActive) {
            if (canvasRef.current) {
                // if (ctx?.clearRect)
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                drawRect(ctx, 0, 0, canvas.width, canvas.height, "black");
                let StateTemp = JSON.parse(state);
                requestAnimationFrame(() => paintGame(ctx, StateTemp, canvas.width, canvas.height));
            }
            console.log("hana");
        }
    }
    socket.off('spectateState').on('spectateState', handlSpectateState);

    const showGame = (gamecode: string) => {
        setTable(false);
        setActive(true);
        socket.emit('spectateGame', gamecode);
    }

    const ShowList = () => {
        setTable(true);
        setActive(false);
    }

    return (
        <>
            {table ?
                <table style={{ width: "50%" }}>
                    <thead>
                        <tr>
                            <td>player One</td>
                            <td>player Two</td>
                            <td>Spec</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? Object.keys(data).map((elem: any) => {
                            return (
                                <tr>
                                    <td key={elem} >{data[elem].p1}</td>
                                    <td key={elem}>{data[elem].p2}</td>
                                    <td key={elem}> <button type='submit' onClick={() => showGame(elem)}>Spectate</button> </td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
                :
                <div>
                    <div style={{ display: "flex", justifyContent: "center" }} className='min-h-screen flex justify-center items-center'>
                        <canvas ref={canvasRef} style={{ border: "1px solid #c3c3c3", backgroundColor: "black" }}></canvas>
                        <button onClick={ShowList}><h1>List</h1></button>
                    </div>
                </div>
            }
        </>
    );
}

export default Spectate