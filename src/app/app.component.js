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
        this.cgol = "Conway's Game of Life";
        this.lant = "Langton's Ant";
        this.pages = [this.cgol, this.lant];
        this.curPage = this.cgol;
    }
    AppComponent.prototype.updatePage = function (page) {
        this.curPage = page;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t<select #p (change)=\"updatePage(p.value)\">\n\t\t<option *ngFor=\"let page of pages\">{{page}}</option>\n\t</select>\n\t<cgol *ngIf=\"curPage == cgol\"></cgol>\n\t<lant *ngIf=\"curPage == lant\"></lant>\n\t",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map