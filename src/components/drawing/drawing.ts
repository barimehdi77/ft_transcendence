const color = [
    { back: "#000000", front: "#ffffff" },
    { back: "#003459", front: "#d9d9d9" },
    { back: "#461220", front: "#fed0bb" },
    { back: "#590d22", front: "#ffccd5" },
    { back: "#184e77", front: "#d9ed92" },
];
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
const drawText = (ctx: any, text: string, x: number, y: number, color: string, percentage: number, size: number) => {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.font = `${size / percentage}px fantasy`;
        ctx.fillText(text, x, y);
    }
}

const paintGameOver = (ctx: any, text: string, index: number, canvWidth: number, canvHeight: number) => {
    let percentage = 600 / canvWidth;
    console.log("paintGameOver: ", index);
    
    drawRect(ctx, 0, 0, canvWidth, canvHeight, color[index].back);
    // drawText(ctx, pOne.score.toString(), (600 / 4) / percentage, (300 / 5) / percentage, color[random].front, percentage, 45);
    drawText(ctx, text, (600 / 3) / percentage, (300 / 2) / percentage, color[index].front, percentage, 45);

}
const paintGame = (ctx: any, gameState: any, canvWidth: number, canvHeight: number) => {
    let percentage = 600 / canvWidth;
    const ball = gameState.ball;
    ball.r = ball.r / percentage;
    ball.x = ball.x / percentage;
    ball.y = ball.y / percentage;

    drawRect(ctx, 0, 0, canvWidth, canvHeight, color[gameState.color].back);
    drawNet(ctx, canvWidth, canvHeight);
    drawCircle(ctx, ball.x, ball.y, ball.radius, color[gameState.color].front);
    paintPlayers(ctx, gameState, percentage, gameState.color);
}

const paintPlayers = (ctx: any, gameState: any, percentage: number, random: number) => {
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

    drawRect(ctx, pOne.x, pOne.y, pOne.width, pOne.height, color[random].front);
    drawRect(ctx, pTwo.x, pTwo.y, pTwo.width, pTwo.height, color[random].front);
    drawText(ctx, pOne.score.toString(), (600 / 4) / percentage, (300 / 5) / percentage, color[random].front, percentage, 45);
    drawText(ctx, pTwo.score.toString(), ((600 / 4) * 3) / percentage, (300 / 5) / percentage, color[random].front, percentage, 45);

    drawText(ctx, pOne.name, 10 / percentage, ((300 / 5) / percentage) - 300 / 8, color[random].front, percentage, 20);
    drawText(ctx, pTwo.name, ((600 / 1.9)) / percentage, ((300 / 5) / percentage) - 300 / 8, color[random].front, percentage, 20);
}

export { drawRect, drawText, drawNet, drawCircle, paintGame, paintPlayers, paintGameOver }
