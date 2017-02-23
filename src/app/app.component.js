"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        //control variables
        this.BOARD_SIZE = 100; //the number of squares tall the board is
        this.BOARD_INTERVAL = 100; //number of milliseconds the board takes to update
        this.initBoard();
        this.running = false;
    }
    AppComponent.prototype.initBoard = function () {
        var viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var boardH = this.BOARD_SIZE;
        var boardW = Math.floor(boardH * viewportW / viewportH);
        this.squareH = Math.floor(viewportH * 0.95 / boardH);
        this.squareW = Math.floor(viewportW * 0.95 / boardW);
        this.board = [];
        this.boardHistory = [];
        for (var i = 0; i < boardH; i++) {
            this.board[i] = [];
            this.boardHistory[i] = [];
            for (var j = 0; j < boardW; j++) {
                this.board[i][j] = false;
                this.boardHistory[i][j] = false;
            }
        }
    };
    AppComponent.prototype.flipSquare = function (y, x) {
        this.boardHistory[y][x] = this.board[y][x] = !this.board[y][x];
    };
    AppComponent.prototype.startGame = function () {
        this.running = true;
        this.boardUpdater = setInterval(this.updateBoard.bind(this), this.BOARD_INTERVAL);
    };
    AppComponent.prototype.stopGame = function () {
        this.running = false;
        clearInterval(this.boardUpdater);
    };
    AppComponent.prototype.clearGame = function () {
        this.stopGame();
        this.initBoard();
    };
    AppComponent.prototype.isRunning = function () {
        return this.running;
    };
    //Apply conway's rules every update
    AppComponent.prototype.updateBoard = function () {
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[0].length; x++) {
                var numberOfNeighbors = this.getNumberOfNeighbors(y, x);
                if (this.boardHistory[y][x] && numberOfNeighbors < 2)
                    this.board[y][x] = false;
                else if (this.boardHistory[y][x] && (numberOfNeighbors == 2 || numberOfNeighbors == 3))
                    this.board[y][x] = true;
                else if (this.boardHistory[y][x] && numberOfNeighbors > 3)
                    this.board[y][x] = false;
                else if (!this.boardHistory[y][x] && numberOfNeighbors == 3)
                    this.board[y][x] = true;
            }
        }
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[0].length; x++) {
                this.boardHistory[y][x] = this.board[y][x];
            }
        }
    };
    AppComponent.prototype.getNumberOfNeighbors = function (y, x) {
        var count = 0;
        if (!this.isOutOfBounds(y - 1, x - 1) && this.boardHistory[y - 1][x - 1])
            count++;
        if (!this.isOutOfBounds(y - 1, x) && this.boardHistory[y - 1][x])
            count++;
        if (!this.isOutOfBounds(y - 1, x + 1) && this.boardHistory[y - 1][x + 1])
            count++;
        if (!this.isOutOfBounds(y, x + 1) && this.boardHistory[y][x + 1])
            count++;
        if (!this.isOutOfBounds(y + 1, x + 1) && this.boardHistory[y + 1][x + 1])
            count++;
        if (!this.isOutOfBounds(y + 1, x) && this.boardHistory[y + 1][x])
            count++;
        if (!this.isOutOfBounds(y + 1, x - 1) && this.boardHistory[y + 1][x - 1])
            count++;
        if (!this.isOutOfBounds(y, x - 1) && this.boardHistory[y][x - 1])
            count++;
        return count;
    };
    AppComponent.prototype.isOutOfBounds = function (y, x) {
        return y < 0 || y >= this.board.length
            || x < 0 || x >= this.board[0].length;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t<h1>Conway's Game of Life</h1>\n\t<button (click)='startGame()' [disabled]=\"isRunning()\">Start</button>\n\t<button (click)='stopGame()' [disabled]=\"!isRunning()\">Stop</button>\n\t<button (click)='clearGame()' [disabled]=\"isRunning()\">Clear</button>\n\t<div class='row' *ngFor=\"let row of board; let y = index\" [style.height]=\"squareH + 'px'\">\n\t\t<div \n\t\t\t*ngFor=\"let square of board[y]; let x = index\"\n\t\t\tclass=\"square\"\n\t\t\t[style.background-color]=\"square?'#FFFFFF':'#000000'\"\n\t\t\t[style.width]=\"squareW + 'px'\"\n\t\t\t(mousedown)=\"flipSquare(y, x)\"\n\t\t></div>\n\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map