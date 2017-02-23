import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: 
	`
	<h1>Conway's Game of Life</h1>
	<div class='row' *ngFor="let row of board; let y = index" [style.height]="squareH + 'px'">
		<div 
			*ngFor="let square of board[y]; let x = index"
			class="square"
			[style.background-color]="square?'#FFFFFF':'#000000'"
			[style.width]="squareW + 'px'"
			(mousedown)="flipSquare(y, x)"
		></div>
	</div>
	`,
})
export class AppComponent { 
	//control variables
	BOARD_SIZE: number = 20; //the number of squares tall the board is
	BOARD_INTERVAL: number = 1000; //number of milliseconds the board takes to update

	//board stuff
	squareH: number;
	squareW: number;
	board: boolean[][];
	boardUpdater: any;

	constructor() {
		this.initBoard();
		this.boardUpdater = setInterval(this.updateBoard(), this.BOARD_INTERVAL);
	}

	initBoard() {
		let viewportW: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		let viewportH: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let boardH: number = this.BOARD_SIZE;
		let boardW: number = Math.floor(boardH * viewportW / viewportH);
		this.squareH = Math.floor(viewportH * 0.95 / boardH);
		this.squareW = Math.floor(viewportW * 0.95 / boardW);

		this.board = [];
		for (let i = 0; i < boardH; i++) {
			this.board[i] = [];
			for (let j = 0; j < boardW; j++) {
				this.board[i][j] = false;
			}
		}
	}

	flipSquare(y: number, x: number) {
		this.board[y][x] = !this.board[y][x];
	}

	//Apply conway's rules every update
	updateBoard() {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[0].length; x++) {
				let numberOfNeighbors = this.getNumberOfNeighbors(y, x);
				if (this.board[y][x] && numberOfNeighbors < 2) this.board[y][x] = false;
				else if (this.board[y][x] && (numberOfNeighbors == 2 || numberOfNeighbors == 3)) this.board[y][x] = true;
				else if (this.board[y][x] && numberOfNeighbors > 3) this.board[y][x] = false;
				else if (!this.board[y][x] && numberOfNeighbors == 3) this.board[y][x] = true;
			}
		}
	}

	getNumberOfNeighbors(y: number, x: number): number {
		let count: number = 0;
		if (this.board[Math.max(y-1, 0)][Math.max(x-1, 0)]) count++;
		if (this.board[Math.max(y-1, 0)][x]) count++;
		if (this.board[Math.max(y-1, 0)][Math.min(x+1, this.board[x].length-1)]) count++;
		if (this.board[y][Math.min(x+1, this.board[x].length-1)]) count++;
		if (this.board[Math.min(y+1, this.board.length-1)][Math.min(x+1, this.board[x].length-1)]) count++;
		if (this.board[Math.min(y+1, this.board.length-1)][x]) count++;
		if (this.board[Math.min(y+1, this.board.length-1)][Math.max(x-1, 0)]) count++;
		if (this.board[y][Math.max(x-1, 0)]]) count++;
		return count;
	}
}
