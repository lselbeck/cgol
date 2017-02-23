import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: 
	`
	<select #p (change)="updatePage(p.value)">
		<option *ngFor="let page of pages">{{page}}</option>
	</select>
	<cgol *ngIf="curPage == cgol"></cgol>
	<lant *ngIf="curPage == lant"></lant>
	`,
})

export class AppComponent { 
	cgol: string = "Conway's Game of Life";
	lant: string = "Langton's Ant";
	pages: string[] = [this.cgol, this.lant];
	curPage: string = this.cgol;

	updatePage(page: string) {
		this.curPage = page;
	}
}
