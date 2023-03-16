module.exports = {
    drawSinglePath: function (ctx, path) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(...path[i]);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    },
    drawPaths: function (context, paths) {
        for (const path of paths) {
            this.drawSinglePath(context, path);
        }
    }
}
