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
        this.BOARD_SIZE = 20; //the number of squares tall the board is
        this.viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.boardH = this.BOARD_SIZE;
        this.boardW = Math.floor(this.boardH * this.viewportW / this.viewportH);
        this.squareH = Math.floor(this.viewportH * 0.95 / this.boardH);
        this.squareW = Math.floor(this.viewportW * 0.95 / this.boardW);
        this.board = [];
        for (var i = 0; i < this.boardH; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.boardW; j++) {
                this.board[i][j] = false;
            }
        }
    }
    AppComponent.prototype.flipSquare = function (y, x) {
        this.board[y][x] = !this.board[y][x];
    };
    AppComponent.prototype.updateBoard = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t<h1>Conway's Game of Life</h1>\n\t<div class='row' *ngFor=\"let row of board; let y = index\" [style.height]=\"squareH + 'px'\">\n\t\t<div \n\t\t\t*ngFor=\"let square of board[y]; let x = index\"\n\t\t\tclass=\"square\"\n\t\t\t[style.background-color]=\"square?'#FFFFFF':'#000000'\"\n\t\t\t[style.width]=\"squareW + 'px'\"\n\t\t\t(mousedown)=\"flipSquare(y, x)\"\n\t\t></div>\n\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map