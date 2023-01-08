import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutPage } from './app.page-about';
import { routing } from './app.routing';
import { PageDefault } from './app.page-default';
import { PageHome } from './app.page-home';
import { ChildComponent } from './app.child';
 
@NgModule({
  declarations: [
    AppComponent, AboutPage, PageDefault, PageHome, ChildComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }