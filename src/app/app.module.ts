import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeroSearchInjectables } from './service/herosearch.injectables';
import { PreviousRouteService } from './service/previous-route.service';
import { HeroComponent } from './hero/hero.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroExploreComponent } from './hero-explore/hero-explore.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoadingComponent } from './loading/loading.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ExploreFilterComponent } from './explore-filter/explore-filter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'explore', component: HeroExploreComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeroExploreComponent,
    PaginatorComponent,
    LoadingComponent,
    ExploreFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HeroSearchInjectables,
    PreviousRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
