import Cell from './cell';

export default class {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.clear();
  }

  clear() {
    this.array = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        this.array[j * this.cols + i] = new Cell(false, false, false);
      }
    }
  }

  getAt(i, j) {
    return this.array[j * this.cols + i];
  }

  setRandomBombs(n) {
    let k = 0;
    while (k < n) {
      const i = Math.floor(Math.random() * this.cols);
      const j = Math.floor(Math.random() * this.rows);
      const cell = this.getAt(i, j);
      if (!cell.isBomb) {
        cell.isBomb = true;
        k = k + 1;
      }
    }
  }

  countNeighborBombs(i, j) {
    const positions = this.neighborPositions(i, j);
    let num = 0;
    for (let k = 0; k < positions.length; k++) {
      let position = positions[k];
      const cell = this.getAt(position.i, position.j);
      if (cell.isBomb) {
        num = num + 1;
      }
    }
    return num;
  }

  neighborPositions(i, j) {
    const min_i = Math.max(i - 1, 0);
    const max_i = Math.min(i + 1, this.cols - 1);
    const min_j = Math.max(j - 1, 0);
    const max_j = Math.min(j + 1, this.rows - 1);
    let list = [];
    for (let jj = min_j; jj <= max_j; jj++) {
      for (let ii = min_i; ii <= max_i; ii++) {
        list.push({i: ii, j: jj});
      }
    }
    return list;
  }

  turnAt(i, j) {
    const cell = this.getAt(i, j);
    if (!cell.isOpen) {
      cell.isFlagged = false;
      cell.isOpen = true;
      if (cell.isBomb) {
        return; // gameover
      }
      const countNeighborBombs = this.countNeighborBombs(i, j);
      if (countNeighborBombs == 0) {
        const positions = this.neighborPositions(i, j);
        for (let k = 0; k < positions.length; k++) {
          const position = positions[k];
          const cell = this.getAt(position.i, position.j);
          if (cell.isOpen == false) {
            const countNeighborBombs =
              this.countNeighborBombs(position.i, position.j);
            if (countNeighborBombs == 0) {
              this.turnAt(position.i, position.j);
            } else {
              cell.isOpen = true;
            }
          }
        }
      }
    }
  }

  flagAt(i, j) {
    const cell = this.getAt(i, j);
    if (!cell.isOpen) {
      cell.isFlagged = !cell.isFlagged;
    }
  }

  isGameclear() {
    const n = this.reduce((n, cell) => {
      if (cell.isBomb || cell.isOpen) {
        return n + 1;
      }
      return n;
    }, 0);
    return n == this.rows * this.cols;
  }

  isGameover() {
    const f = this.reduce((f, cell) => {
      if (!f && cell.isBomb && cell.isOpen) {
        return true;
      }
      return f;
    }, false);
    return f;
  }

  reduce(callback, initialValue) {
    let result = initialValue;
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        const cell = this.getAt(i, j);
        result = callback(result, cell);
      }
    }
    return result;
  }
}
