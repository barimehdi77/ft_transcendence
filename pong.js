//select canvas
var canvas = document.getElementById("Pong");
var ctx = canvas.getContext("2d");
// canvas.width = 600;
// canvas.height = 400;
// create user paddle
const user = {
    x : 0,
    y : canvas.height / 2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// create the computer paddle
const com = {
    x : canvas.width - 10,
    y : canvas.height / 2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5,
    color : "WHITE"
}

// draw rect
function drawRect(x, y, w, h, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// create the net
const net = {
    x : canvas.width / 2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}
// draw the net
function drawNet(){
    for(var i = 0; i <= canvas.height; i += 15)
    {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
} 

// draw Circle
function drawCircle(x, y, r, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

// draw Text
function drawText(text, x, y, color)
{
    ctx.fillStyle = color;
    ctx.font = '45px fantasy';
    ctx.fillText(text, x, y);
}

// render the game
function render(){
    //clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    //draw the net
    drawNet();
    // //draw score
    drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    // //draw the user & computer paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    // //draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// control the user paddle
canvas = addEventListener("mousemove", movePaddle)
function movePaddle(evt)
{
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// collision detection
// function collision(b, p)
// {
    // b.top = b.y - b.raduis;
    // b.bottom = b.y + b.raduis;
    // b.left = b.x + b.raduis;
    // b.right = b.x + b.raduis;

    // p.top = p.y;
    // p.bottom = p.y + p.height;
    // p.left = p.x;
    // p.right = p.x + p.width;

    // return (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom);
// }

// reset ball
// function resetBall()
// {
    // ball.x = canvas.width / 2;
    // ball.y = canvas.height / 2;
    // ball.speed = 5;
    // ball.velocityX = -ball.velocityX;
// }

// update : pos, mov, score, ...
// function update()
// {
    // ball.x += ball.velocityX;
    // ball.y += ball.velocityY;
    // // sample AI to control the com paddle
    // let comLvl = 0.1;
    // com.y = (ball.y - (com.y + com.height / 2 )) * comLvl;
    // // if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
    // if (ball.y - ball.radius < 0 || ball.y + ball.radius > 400)
    //     ball.velocityY = -ball.velocityY;
    // let player =  (ball.x < canvas.width / 2) ? user : com;
    // if (collision(ball, player))
    // {
    //     // where the ball hit the player
    //     let collidPoint = ball.y - (player.y + player.height / 2);
    //     // normalisation
    //     collidPoint /= player.height / 2;
    //     // calculate angle in radian
    //     let angleRad = collidPoint * Math.PI / 4;
    //     // X direction of the ball when it's hit
    //     let direction = (ball.x < canvas.width / 2) ? 1 : -1;

    //     // change vel X and Y
    //     ball.velocityX = ball.speed * Math.cos(angleRad);
    //     ball.velocityY = ball.speed * Math.sin(angleRad);
    //     // everytime the ball hit a paddle, we encrese its speed
    //     ball.speed += 0.5;
    //     // update the score;
    //     if (ball.x - ball.radius < 0)
    //     {
    //         com.score++;
    //         resetBall();
    //     }
    //     else if (ball.x + ball.radius > canvas.width)
    //     {            
    //         user.score++;
    //         resetBall();
    //     }
    // }

// }

// game init function
function game(){
    // update();
    render();
    // console.log(canvas.width, canvas.height);
}

// loop
const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
// setInterval(game, 1000);
