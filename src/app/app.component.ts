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
	BOARD_SIZE: number = 20 //the number of squares tall the board is

	viewportW: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	viewportH: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	boardH: number = this.BOARD_SIZE;
	boardW: number = Math.floor(this.boardH * this.viewportW / this.viewportH);
	squareH: number = Math.floor(this.viewportH * 0.95 / this.boardH);
	squareW: number = Math.floor(this.viewportW * 0.95 / this.boardW);
	board: boolean[][];
	

	constructor() {
		this.board = [];
		for (let i = 0; i < this.boardH; i++) {
			this.board[i] = [];
			for (let j = 0; j < this.boardW; j++) {
				this.board[i][j] = false;
			}
		}
	}

	flipSquare(y: number, x: number) {
		this.board[y][x] = !this.board[y][x];
	}

	updateBoard() {
		
	}
}
