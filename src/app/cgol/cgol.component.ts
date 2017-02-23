import { Component } from '@angular/core';

@Component({
	selector: 'cgol',
	template: 
	`
	<button (click)='startGame()' [disabled]="isRunning()">Start</button>
	<button (click)='stopGame()' [disabled]="!isRunning()">Stop</button>
	<button (click)='clearGame()' [disabled]="isRunning()">Clear</button>
	<select #interval (change)="updateInterval(interval.value)" value={{intervalOptions[0]}}>
		<option selected disabled>Interval (ms)</option>
		<option *ngFor="let interval of intervalOptions">{{interval}}</option>
	</select>


	<div class='row disable-select' *ngFor="let row of board; let y = index" [style.height]="squareH + 'px'">
		<div 
			*ngFor="let square of board[y]; let x = index"
			class="square"
			[style.background-color]="square?'#FFFFFF':'none'"
			[style.width]="squareW + 'px'"
			(mousedown)="mouseDown(y, x)"
			(mouseup)="mouseUp(y, x)"
			(mouseover)="flipSquare(y, x)"
		></div>
	</div>
	`,
})
export class CgolComponent { 
	//control variables
	BOARD_SIZE: number = 100; //the number of squares tall the board is
	BOARD_INTERVAL: number = 100; //number of milliseconds the board takes to update
	intervalOptions: number[] = [50, 100, 500, 1000, 2000];

	//board stuff
	squareH: number;
	squareW: number;
	board: boolean[][];
	boardHistory: boolean[][];
	boardUpdater: any;
	running: boolean;
	mouseState: boolean;

	constructor() {
		this.initBoard(this.BOARD_SIZE);
		this.running = false;
		this.mouseState = false;
	}

	initBoard(boardSize: number) {
		let viewportW: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		let viewportH: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let boardH: number = boardSize;
		let boardW: number = Math.floor(boardH * viewportW / viewportH);
		this.squareH = Math.floor(viewportH * 0.95 / boardH);
		this.squareW = Math.floor(viewportW * 0.95 / boardW);

		this.board = [];
		this.boardHistory = [];
		for (let i = 0; i < boardH; i++) {
			this.board[i] = [];
			this.boardHistory[i] = [];
			for (let j = 0; j < boardW; j++) {
				this.board[i][j] = false;
				this.boardHistory[i][j] = false;
			}
		}
		
	}

	mouseDown(y: number, x: number) { this.mouseState = true; }
	mouseUp(y: number, x: number) { this.mouseState = false; }

	flipSquare(y: number, x: number) {
		if (this.mouseState) this.boardHistory[y][x] = this.board[y][x] = !this.board[y][x];
	}

	startGame() {
		this.running = true;
		this.boardUpdater = setInterval(this.updateBoard.bind(this), this.BOARD_INTERVAL);
	}

	stopGame() {
		this.running = false;
		clearInterval(this.boardUpdater);
	}

	clearGame() {
		this.stopGame();
		this.initBoard(this.BOARD_SIZE);
	}

	isRunning(): boolean {
		return this.running;
	}

	//Apply conway's rules every update
	updateBoard() {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[0].length; x++) {
				let numberOfNeighbors = this.getNumberOfNeighbors(y, x);
				if (this.boardHistory[y][x] && numberOfNeighbors < 2) this.board[y][x] = false;
				else if (this.boardHistory[y][x] && (numberOfNeighbors == 2 || numberOfNeighbors == 3)) this.board[y][x] = true;
				else if (this.boardHistory[y][x] && numberOfNeighbors > 3) this.board[y][x] = false;
				else if (!this.boardHistory[y][x] && numberOfNeighbors == 3) this.board[y][x] = true;
			}
		}
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[0].length; x++) {
				this.boardHistory[y][x] = this.board[y][x];
			}
		}
	}

	getNumberOfNeighbors(y: number, x: number): number {
		let count: number = 0;
		if (!this.isOutOfBounds(y-1, x-1) && this.boardHistory[y-1][x-1]) count++;
		if (!this.isOutOfBounds(y-1, x)   && this.boardHistory[y-1][x])   count++;
		if (!this.isOutOfBounds(y-1, x+1) && this.boardHistory[y-1][x+1]) count++;
		if (!this.isOutOfBounds(y,   x+1) && this.boardHistory[y]  [x+1]) count++;
		if (!this.isOutOfBounds(y+1, x+1) && this.boardHistory[y+1][x+1]) count++;
		if (!this.isOutOfBounds(y+1, x)   && this.boardHistory[y+1][x])   count++;
		if (!this.isOutOfBounds(y+1, x-1) && this.boardHistory[y+1][x-1]) count++;
		if (!this.isOutOfBounds(y,   x-1) && this.boardHistory[y]  [x-1]) count++;
		return count;
	}

	isOutOfBounds(y: number, x: number): boolean {
		return y < 0 || y >= this.board.length
			|| x < 0 || x >= this.board[0].length;
	}

	updateInterval(interval: number) {
		this.BOARD_INTERVAL = interval;
		this.stopGame();
		this.startGame();
	}
}
