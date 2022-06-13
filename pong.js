//select canvas
var canvas = document.getElementById("Pong");
var ctx = canvas.getContext("2d");
ctx.width = 600;
ctx.height = 400;
// create user paddle
const user = {
    x : 0,
    y : ctx.height / 2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// create the computer paddle
const com = {
    x : ctx.width - 10,
    y : ctx.height / 2 - 50,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// create the ball
const ball = {
    x: ctx.width / 2,
    y: ctx.height / 2,
    raduis : 10,
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
    x : ctx.width / 2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}
// draw the net
function drawNet(){
    for(var i = 0; i <= ctx.height; i += 15)
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
    drawRect(0, 0, ctx.width, ctx.height, "BLACK");
    //draw the net
    drawNet();
    // //draw score
    drawText(user.score, ctx.width / 4, ctx.height / 5, "WHITE");
    drawText(com.score, 3 * ctx.width / 4, ctx.height / 5, "WHITE");
    // //draw the user & computer paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    // //draw the ball
    drawCircle(ball.x, ball.y, ball.raduis, ball.color);
}

// game init function
function game(){
    render();
    console.log(ctx.width, ctx.height);
}

// loop
const framePerSecond = 50;
// setInterval(game, 1000 / framePerSecond);
setInterval(game, 1000);
