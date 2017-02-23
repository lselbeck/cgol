import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CgolComponent } from './cgol/cgol.component';
import { LantComponent } from './lant/lant.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, CgolComponent, LantComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
