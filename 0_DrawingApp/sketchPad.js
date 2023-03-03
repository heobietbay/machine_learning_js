class SketchPad {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.#addEventListeners();
        this.reset();
    }

    undo() {
        this.paths.pop();
        this.#redraw();
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #redraw() {
        this.context.clearRect(0, 0,
            this.canvas.width, this.canvas.height);
        this.#drawPaths(this.context, this.paths);
    }

    #drawPaths(context, paths) {
        for (const path of paths) {
            this.#drawSinglePath(context, path);
        }
    }

    #drawSinglePath(ctx, path) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(...path[i]);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#onMouseDown);
        this.canvas.addEventListener("mousemove", this.#onMouseMove);
        document.addEventListener("mouseup", () => {
            this.isDrawing = false;
        });
    }
    #onMouseDown = (event) => {
        this.isDrawing = true;
        this.paths.push([this.#getMousePath(event)]);
    }
    #onMouseMove = (event) => {
        if (!this.isDrawing) {
            return;
        }
        const mousePath = this.#getMousePath(event);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mousePath);
        this.#redraw();
    }

    /**
     * Get the mouse path relative to the canvas.
     * @param {*} evt 
     * @returns 
     */
    #getMousePath(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }
}