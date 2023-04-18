class SketchPad {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.onRedrawed = () => {}; // default imp, to get rid of null check
    this.#addEventListeners();
    this.reset();
  }

  setOnRedrawed(onRedrawed) {
    this.onRedrawed = onRedrawed;
  }

  undo() {
    this.paths.pop();
    this.#redraw();    
    this.onRedrawed(this.paths);
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  #redraw() {
    this.context.clearRect(0, 0,
      this.canvas.width, this.canvas.height);
    drawPaths(this.context, this.paths);
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#onMouseDown);
    this.canvas.addEventListener("mousemove", this.#onMouseMove);
    document.addEventListener("mouseup", () => {
      this.isDrawing = false;
      this.onRedrawed(this.paths);
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