import { useEffect, useRef, useState } from "react"
import { isErrored } from "stream";

export default function CanvasPage() {
	const canvasRef = useRef(null);
	const canvWidth = 600;
	const canvHeight = 400;

	// create user paddle
	const [user, setUser] = useState({
		x: 0,
		y: (canvHeight - 100) / 2,
		width: 10,
		height: 100,
		color: "white",
		score: 0
	})

	// create the computer paddle
	const [com, setCom] = useState({
		x: canvWidth - 10,
		y: (canvHeight - 100) / 2,
		width: 10,
		height: 100,
		color: "white",
		score: 0
	})

	// create the ball
	const [ball, setball] = useState({
		x: canvWidth / 2,
		y: canvHeight / 2,
		radius: 10,
		speed: 7,
		velocityX: 5,
		velocityY: 5,
		color: "white"
	})

	// create the net
	const [net, setNet] = useState({
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

	function collision(b: any, p: any) {
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

	function resetBall() {
		ball.x = canvWidth / 2;
		ball.y = canvHeight / 2;
		ball.speed = 7;
		ball.velocityX = -ball.velocityX;
	}

	// Render && update
	useEffect(() => {
		let inter: NodeJS.Timer | undefined;
		const interval = setInterval(() => {
			// console.log("interval");
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
				drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);

				/*          UPDATE      */
				if (ball.x - ball.radius < 0) {
					com.score++;
					resetBall();
				}
				else if (ball.x + ball.radius > canvas.width) {
					user.score++;
					resetBall();
				}

				// the ball has a velocity
				ball.x += ball.velocityX;
				ball.y += ball.velocityY;
				// computer plays for itself, and we must be able to beat it
				// sample AI to control the com paddle
				com.y += (ball.y - (com.y + com.height / 2)) * 0.1;
				// if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
				if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
					ball.velocityY = -ball.velocityY;
				let player = (ball.x + ball.radius < canvas.width / 2) ? user : com;
				if (collision(ball, player)) {
					// where the ball hit the player
					let collidPoint = ball.y - (player.y + player.height / 2);
					// normalisation
					collidPoint /= player.height / 2;
					// calculate angle in radian
					let angleRad = collidPoint * (Math.PI / 4);
					// X direction of the ball when it's hit
					let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;

					// change vel X and Y
					ball.velocityX = direction * ball.speed * Math.cos(angleRad);
					ball.velocityY = ball.speed * Math.sin(angleRad);
					// everytime the ball hit a paddle, we encrese its speed
					ball.speed += 0.1;
					// update the score;
				}
			}
		}, 1000 / 50);

		document.addEventListener("keydown", (event) => {
			let toadd = 0;
			if (event.key === 'w' || event.key === 'W') {
				if (user.y <= 0)
					toadd = 0;
				else
					toadd -= 5;
			}
			else if (event.key === 's' || event.key === 's') {
				if (toadd + 100 >= canvHeight)
					toadd = canvHeight - 100;
				else
					toadd += 5;
			}
			startMoving(toadd);
		});

		function startMoving(toadd: any) {
			if (inter === undefined) {      
			  loop(toadd);
			}
		 }

		 function loop(toadd: any) {
			move(toadd);
			inter = setTimeout(loop, 1000 / 60, toadd);
		  }

		  function move(toadd: any) {
			user.y += toadd;
			if (user.y <= 0)
					user.y = 0;
			else if (user.y + 100 >= canvHeight)
				user.y = canvHeight - 100;
		  }

		  function stopMoving() {
			clearTimeout(inter);
			inter = undefined;
		  }
		  
		  document.addEventListener("keyup", (event) => {
			stopMoving();
		  });
		console.log("Ana mchiit");
		return () => clearInterval(interval);
	}, [])
	return (
		<div>
			<canvas width={600} height={400} ref={canvasRef} style={{ border: "1px solid #c3c3c3" }}></canvas>
		</div>
	)
}
