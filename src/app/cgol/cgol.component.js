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
var CgolComponent = (function () {
    function CgolComponent() {
        //control variables
        this.intervalOptions = [100, 200, 500, 1000, 2000];
        this.sizeOptions = [10, 20, 50, 100];
        this.BOARD_SIZE = this.sizeOptions[3]; //the number of squares tall the board is
        this.BOARD_INTERVAL = this.intervalOptions[0]; //number of milliseconds the board takes to update
        this.initBoard();
        this.running = false;
        this.mouseState = false;
        this.drawing = true;
    }
    CgolComponent.prototype.initBoard = function () {
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
    CgolComponent.prototype.mouseDown = function (y, x) {
        this.mouseState = true;
        this.drawing = !this.board[y][x];
        this.mouseDrag(y, x);
    };
    CgolComponent.prototype.mouseUp = function (y, x) {
        this.mouseState = false;
    };
    CgolComponent.prototype.mouseDrag = function (y, x) {
        if (this.mouseState) {
            if (this.drawing) {
                this.drawSquare(y, x);
            }
            else {
                this.eraseSquare(y, x);
            }
        }
    };
    CgolComponent.prototype.drawSquare = function (y, x) {
        this.boardHistory[y][x] = this.board[y][x] = true;
    };
    CgolComponent.prototype.eraseSquare = function (y, x) {
        this.boardHistory[y][x] = this.board[y][x] = false;
    };
    CgolComponent.prototype.startGame = function () {
        this.running = true;
        this.boardUpdater = setInterval(this.updateBoard.bind(this), this.BOARD_INTERVAL);
    };
    CgolComponent.prototype.stopGame = function () {
        this.running = false;
        clearInterval(this.boardUpdater);
    };
    CgolComponent.prototype.clearGame = function () {
        this.stopGame();
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[0].length; j++) {
                this.eraseSquare(i, j);
            }
        }
    };
    CgolComponent.prototype.isRunning = function () {
        return this.running;
    };
    //Apply conway's rules every update
    CgolComponent.prototype.updateBoard = function () {
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
    CgolComponent.prototype.getNumberOfNeighbors = function (y, x) {
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
    CgolComponent.prototype.isOutOfBounds = function (y, x) {
        return y < 0 || y >= this.board.length
            || x < 0 || x >= this.board[0].length;
    };
    CgolComponent.prototype.updateInterval = function (interval) {
        this.BOARD_INTERVAL = interval;
        if (this.running) {
            this.stopGame();
            this.startGame();
        }
    };
    CgolComponent.prototype.updateSize = function (size) {
        this.BOARD_SIZE = size;
        if (this.running)
            this.stopGame();
        this.initBoard();
    };
    CgolComponent = __decorate([
        core_1.Component({
            selector: 'cgol',
            template: "\n\t<button (click)='startGame()' [disabled]=\"isRunning()\">Start</button>\n\t<button (click)='stopGame()' [disabled]=\"!isRunning()\">Stop</button>\n\t<button (click)='clearGame()'>Clear</button>\n\t<select #size (change)=\"updateSize(size.value)\" value={{sizeOptions[3]}}>\n\t\t<option selected disabled>Height</option>\n\t\t<option *ngFor=\"let size of sizeOptions\">{{size}}</option>\n\t</select>\n\t<select #interval (change)=\"updateInterval(interval.value)\" value={{intervalOptions[0]}}>\n\t\t<option selected disabled>Interval (ms)</option>\n\t\t<option *ngFor=\"let interval of intervalOptions\">{{interval}}</option>\n\t</select>\n\n\t<div class='row disable-select' *ngFor=\"let row of board; let y = index\" [style.height]=\"squareH + 'px'\">\n\t\t<div \n\t\t\t*ngFor=\"let square of board[y]; let x = index\"\n\t\t\tclass=\"square\"\n\t\t\t[style.background-color]=\"square?'#FFFFFF':'none'\"\n\t\t\t[style.width]=\"squareW + 'px'\"\n\t\t\t(mousedown)=\"mouseDown(y, x)\"\n\t\t\t(mouseup)=\"mouseUp(y, x)\"\n\t\t\t(mouseover)=\"mouseDrag(y, x)\"\n\t\t></div>\n\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], CgolComponent);
    return CgolComponent;
}());
exports.CgolComponent = CgolComponent;
//# sourceMappingURL=cgol.component.js.map