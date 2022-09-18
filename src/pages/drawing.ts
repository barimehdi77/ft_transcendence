// draw rect
const drawRect = (ctx: any, x: number, y: number, w: number, h: number, color: string) => {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
}

const drawNet = (ctx: any, canvWidth: number, canvHeight: number) => {
    for (var i = 0; i <= canvHeight; i += 15)
        drawRect(ctx, (canvWidth / 2) - 1, 0 + i, 2, 10, "white");
}

// //draw circle
const drawCircle = (ctx: any, x: number, y: number, r: number, color: string) => {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
}

// // draw Text
const drawText = (ctx: any, text: string, x: number, y: number, color: string, percentage: number) => {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.font = `${45 / percentage}px fantasy`;
        ctx.fillText(text, x, y);
    }
}

const paintGame = (ctx: any, gameState: any, canvWidth: number, canvHeight: number) => {
    let percentage = 600 / canvWidth;
    const ball = gameState.ball;
    ball.r = ball.r / percentage;
    ball.x = ball.x / percentage;
    ball.y = ball.y / percentage;

    drawRect(ctx, 0, 0, canvWidth, canvHeight, "black");
    drawNet(ctx, canvWidth, canvHeight);
    drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
    paintPlayers(ctx, gameState, percentage);
}

const paintPlayers = (ctx: any, gameState: any, percentage: number) => {
    const pOne = gameState.playerOne;
    const pTwo = gameState.playerTwo;
    pOne.x = pOne.x / percentage;
    pOne.y = pOne.y / percentage;
    pOne.width = pOne.width / percentage;
    pOne.height = pOne.height / percentage;
    pTwo.x = pTwo.x / percentage;
    pTwo.y = pTwo.y / percentage;
    pTwo.width = pTwo.width / percentage;
    pTwo.height = pTwo.height / percentage;

    drawRect(ctx, pOne.x, pOne.y, pOne.width, pOne.height, pOne.color);
    drawRect(ctx, pTwo.x, pTwo.y, pTwo.width, pTwo.height, pTwo.color);
    drawText(ctx, pOne.score.toString(), (600 / 4) / percentage, (300 / 5) / percentage, "white", percentage);
    drawText(ctx, pTwo.score.toString(), ((600 / 4) * 3) / percentage, (300 / 5) / percentage, "white", percentage);
}

export { drawRect, drawText, drawNet, drawCircle, paintGame, paintPlayers }
