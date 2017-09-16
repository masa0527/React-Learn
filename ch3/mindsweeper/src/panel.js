export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.defineInputListeners();
    this.startInputListeners();
  }

  setCanvasSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setTable(table) {
    this.table = table;
  }

  setActionListener(callback) {
    this.actionListener = callback;
  }

  defineInputListeners() {
    this.clicked = (e) => {
      const [i, j] = this.getPosition(e.layerX, e.layerY);
      if (i !== null && j !== null) {
        this.actionListener('clicked', [i, j]);
      }
    };
    this.contextmenu = (e) => {
      e.preventDefault();
      const [i, j] = this.getPosition(e.layerX, e.layerY);
      if (i !== null && j !== null) {
        this.actionListener('rightClicked', [i, j]);
      }
    }
  }

  startInputListeners() {
    this.isListening = true;
    canvas.addEventListener('click', this.clicked, false);
    canvas.addEventListener('contextmenu', this.contextmenu, false);
  }

  stopInputListeners() {
    canvas.removeEventListener('click', this.clicked, false);
    canvas.removeEventListener('contextmenu', this.contextmenu, false);
    this.isListening = false;
  }

  getPosition(x, y) {
    let ii = null, jj = null;
    const table = this.table;
    const cols = table.cols;
    const rows = table.rows;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        if (this.width / cols * i <= x && this.height / rows * j <= y &&
          x < this.width / cols * (i + 1) && y < this.height / rows * (j + 1)) {
          ii = i;
          jj = j;
          break;
        }
      }
    }
    return [ii, jj];
  }

  paint() {
    if (this.table !== null) {
      for (let j = 0; j < this.table.rows; j++) {
        for (let i = 0; i < this.table.cols; i++) {
          const cell = this.table.getAt(i, j);
          this.paintCell(cell, i, j);
        }
      }
    }
  }

  paintCell(cell, i, j) {
    const ctx = this.context;
    const width = this.width / this.table.cols;
    const height = this.height / this.table.rows;
    const left = width * i;
    const top = height * j;
    const fontSize = Math.ceil(Math.min(width, height) * 0.8);
    let fill, stroke, text;
    if (cell.isOpen) {
      fill = 'rgb(255,200,200)';
      stroke = 'rgb(0,0,255)';
      if (cell.isBomb) {
        text = '\u2620';
      } else {
        const n = this.table
          .countNeighborBombs(i, j);
        if (n > 0) {
          text = n;
        }
      }
    } else {
      fill = 'rgb(255,255,255)';
      stroke = 'rgb(0,0,255)';
      if (cell.isFlagged) {
        text = '\u2713';
      }
    }
    ctx.fillStyle = fill;
    ctx.fillRect(left, top, width, height);
    ctx.StrokeStyle = stroke;
    ctx.strokeRect(left, top, width, height);
    if (text) {
      ctx.fillStyle = 'rgb(50,50,50)';
      ctx.font =
        `${fontSize}px 'Times New Roman'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, left
        + width / 2, top + height / 2);
    }
  }
}
