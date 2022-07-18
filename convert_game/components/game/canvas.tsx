import { type } from "os";
import { useEffect, useRef, useState } from "react"
import { createContext } from "vm";

export default function CanvasPage() {
    const canvasRef = useRef(null);
    const canvWidth = 600;
    const canvHeight = 400;

    // create user paddle
    const [user, changeUser] = useState({
        x: 0,
        y: (canvHeight - 100) / 2,
        width: 10,
        height: 100,
        color: "white",
        score: 0
    })

    // create the computer paddle
    const [com, chengeCom] = useState({
        x: canvWidth - 10,
        y: (canvHeight - 100) / 2,
        width: 10,
        height: 100,
        color: "white",
        score: 0
    })

    // create the ball
    const [ball, changeball] = useState({
        x: canvWidth / 2,
        y: canvHeight / 2,
        raduis: 10,
        speed: 7,
        velocityX: 5,
        velocityY: 5,
        color: "white"
    })

    // create the net
    const [net, changeNet] = useState({
        x: (canvWidth / 2) - 1,
        y: 0,
        width: 2,
        height: 10,
        color: "white"
    })

    // draw rect
    function drawRect(ctx: CanvasRenderingContext2D | null, x: number, y: number, w: number, h: number, color: string) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        }
    }


    function drawNet(ctx: CanvasRenderingContext2D | null) {
        for (var i = 0; i <= canvHeight; i += 15)
            drawRect(ctx, net.x, net.y + i, net.width, net.height, net.color);
    }

    //draw circle
    function drawCircle(ctx: CanvasRenderingContext2D | null, x: number, y: number, r: number, color: string) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }
    }


    // draw Text
    function drawText(ctx: CanvasRenderingContext2D | null, text: string, x: number, y: number, color: string) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.font = '45px fantasy';
            ctx.fillText(text, x, y);
        }
    }

    type obj = {
        top: number;
        bottom: number;
        width: number;
        height: number;
        left: number;
        right: number;
        x: number;
        y: number;
        radius: number;
    }

    function colliction(b: obj, p: obj) {
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;

        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.x + b.radius;

        return (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom);
    }

    function resetBall() 
    {
        ball.x = canvWidth / 2;
        ball.y = canvHeight / 2;
        ball.speed = 7;
        ball.velocityX = -ball.velocityX;
    }

    useEffect(() => {
        if (canvasRef.current) {
            const canvas: HTMLCanvasElement = canvasRef.current;
            const ctx = canvas.getContext("2d");
            //clear the canvas
            drawRect(ctx, 0, 0, canvWidth, canvHeight, "black");
            //draw the net
            drawNet(ctx);
            //draw score
            drawText(ctx, user.score.toString(), canvWidth / 4, canvHeight / 5, "white");
            drawText(ctx, com.score.toString(), 3 * canvWidth / 4, canvHeight / 5, "white");
            //draw the user & computer paddle
            drawRect(ctx, user.x, user.y, user.width, user.height, user.color);
            drawRect(ctx, com.x, com.y, com.width, com.height, com.color);
            //draw the ball
            drawCircle(ctx, ball.x, ball.y, ball.raduis, ball.color);
        }
    })
    return (
        <div>
            <canvas width={600} height={400} ref={canvasRef} style={{ border: "1px solid #c3c3c3" }}></canvas>
        </div>
    )
}
