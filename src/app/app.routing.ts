import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { AboutPage }             from './app.page-about';
import { PageDefault }           from './app.page-default';
import { PageHome }              from './app.page-home';

const appRoutes: Routes = [
  { path: 'page-home', component: PageHome },
  { path: 'page-about', component: AboutPage },
  { path: '', redirectTo: '/pageHome', pathMatch: 'full' },
  { path: '**', component: PageHome }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);