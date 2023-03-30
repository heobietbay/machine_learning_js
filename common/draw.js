const drawSinglePath = function (ctx, path) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
};

const drawPaths = function (context, paths) {
    for (const path of paths) {
        drawSinglePath(context, path);
    }
};

if(typeof module !== 'undefined') {
    module.exports = {
        drawSinglePath,
        drawPaths
    }
}
