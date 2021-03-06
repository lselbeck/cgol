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
        this.wrapOptions = ["No Wrap Around", "Wrap Around"];
        this.BOARD_SIZE = this.sizeOptions[1]; //the number of squares tall the board is
        this.BOARD_INTERVAL = this.intervalOptions[1]; //number of milliseconds the board takes to update
        this.BOARD_WRAP = false; //wrapping for edges of board
        this.initBoard();
        this.running = false;
        this.mouseState = false;
        this.drawing = true;
    }
    CgolComponent.prototype.initBoard = function () {
        var viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.boardH = this.BOARD_SIZE;
        this.boardW = Math.floor(this.boardH * viewportW / viewportH);
        this.squareH = Math.floor(viewportH * 0.95 / this.boardH);
        this.squareW = Math.floor(viewportW * 0.95 / this.boardW);
        this.board = [];
        this.boardHistory = [];
        for (var i = 0; i < this.boardH; i++) {
            this.board[i] = [];
            this.boardHistory[i] = [];
            for (var j = 0; j < this.boardW; j++) {
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
        for (var i = 0; i < this.boardH; i++) {
            for (var j = 0; j < this.boardW; j++) {
                this.eraseSquare(i, j);
            }
        }
    };
    CgolComponent.prototype.isRunning = function () {
        return this.running;
    };
    //Apply conway's rules every update
    CgolComponent.prototype.updateBoard = function () {
        for (var y = 0; y < this.boardH; y++) {
            for (var x = 0; x < this.boardW; x++) {
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
        if (this.BOARD_WRAP) {
            if (this.boardHistory[this.mod(y - 1, this.boardH)][this.mod(x - 1, this.boardW)])
                count++;
            if (this.boardHistory[this.mod((y - 1), this.boardH)][this.mod(x, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y - 1, this.boardH)][this.mod(x + 1, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y, this.boardH)][this.mod(x + 1, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y + 1, this.boardH)][this.mod(x + 1, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y + 1, this.boardH)][this.mod(x, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y + 1, this.boardH)][this.mod(x - 1, this.boardW)])
                count++;
            if (this.boardHistory[this.mod(y, this.boardH)][this.mod(x - 1, this.boardW)])
                count++;
        }
        else {
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
        }
        return count;
    };
    CgolComponent.prototype.isOutOfBounds = function (y, x) {
        return y < 0 || y >= this.boardH
            || x < 0 || x >= this.boardW;
    };
    CgolComponent.prototype.updateInterval = function (interval) {
        this.BOARD_INTERVAL = Number(interval);
        if (this.running) {
            this.stopGame();
            this.startGame();
        }
    };
    CgolComponent.prototype.updateSize = function (size) {
        this.BOARD_SIZE = Number(size);
        if (this.running)
            this.stopGame();
        this.initBoard();
    };
    CgolComponent.prototype.updateWrap = function () {
        this.BOARD_WRAP = !this.BOARD_WRAP;
    };
    //helper math function (because js modulo operator isn't a real modulo)
    CgolComponent.prototype.mod = function (n, m) {
        return ((n % m) + m) % m;
    };
    CgolComponent.prototype.toType = function (obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };
    CgolComponent = __decorate([
        core_1.Component({
            selector: 'cgol',
            template: "\n\t<button (click)='startGame()' [disabled]=\"isRunning()\">Start</button>\n\t<button (click)='stopGame()' [disabled]=\"!isRunning()\">Stop</button>\n\t<button (click)='clearGame()'>Clear</button>\n\t<select #size (change)=\"updateSize(size.value)\" value={{BOARD_SIZE}}>\n\t\t<option selected disabled>Height</option>\n\t\t<option *ngFor=\"let size of sizeOptions\">{{size}}</option>\n\t</select>\n\t<select #interval (change)=\"updateInterval(interval.value)\" value={{BOARD_INTERVAL}}>\n\t\t<option selected disabled>Interval (ms)</option>\n\t\t<option *ngFor=\"let interval of intervalOptions\">{{interval}}</option>\n\t</select>\n\t<select #wrap (change)=\"updateWrap()\">\n\t\t<option *ngFor=\"let wrap of wrapOptions\">{{wrap}}</option>\n\t</select>\n\n\t<div class='row disable-select' *ngFor=\"let row of board; let y = index\" [style.height]=\"squareH + 'px'\">\n\t\t<div \n\t\t\t*ngFor=\"let square of board[y]; let x = index\"\n\t\t\tclass=\"square\"\n\t\t\t[style.background-color]=\"square?'#FFFFFF':'none'\"\n\t\t\t[style.width]=\"squareW + 'px'\"\n\t\t\t(mousedown)=\"mouseDown(y, x)\"\n\t\t\t(mouseup)=\"mouseUp(y, x)\"\n\t\t\t(mouseover)=\"mouseDrag(y, x)\"\n\t\t></div>\n\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], CgolComponent);
    return CgolComponent;
}());
exports.CgolComponent = CgolComponent;
//# sourceMappingURL=cgol.component.js.map