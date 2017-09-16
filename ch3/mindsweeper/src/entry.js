import Table from './table';
import Panel from './panel';
import * as Values from './values';

class MindSweeper {
  constructor() {
    const canvas = document.querySelector('#canvas');
    const message = document.querySelector('#message');
    const resetButton = document.querySelector('#reset');
    this.panel = new Panel(canvas);
    this.table = null;
    this.panel.setCanvasSize(Values.PANEL_WIDTH,Values.PANEL_HEIGHT);
    this.panel.setActionListener( (status,data) => {
      if (status === 'clicked') {
        const [i,j] = data;
        if (i !== null && j !== null) {
          this.table.turnAt(i,j);
          this.panel.paint();
          if (this.table.isGameclear()) {
            message.innerHTML = 'Game Clear!';
            this.panel.stopInputListeners();
          } else if (this.table.isGameover()) {
            message.innerHTML = 'Game Over!';
            this.panel.stopInputListeners();
          }
        }
      } else if (status === 'rightClicked') {
        const [i,j] = data;
        this.table.flagAt(i,j);
        this.panel.paint();
      }
    });

    resetButton.addEventListener('click',() => {
      message.innerHTML = '';
      this.initGame();
    },false);
  }

  initGame() {
    this.table = new Table(Values.TABLE_COLS,Values.TABLE_ROWS);
    this.table.setRandomBombs(Values.NUM_BOMBS);
    this.panel.setTable(this.table);
    this.panel.paint();
    if (! this.panel.isListening) {
      this.panel.startInputListeners();
    }
  }
}

const mindSweeper = new MindSweeper();
mindSweeper.initGame();

