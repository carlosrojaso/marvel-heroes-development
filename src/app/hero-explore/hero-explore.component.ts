import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Subscription ,  Observable } from 'rxjs';
import { HeroSearchService } from '../service/herosearch.service';
import { HeroSearchResult } from '../model/heroSearchResult.model';
import { Hero } from '../model/hero.model';
import { RESULTS_PER_PAGE } from '../service/herosearch.service.config';
import { PreviousRouteService } from '../service/previous-route.service';
import { HandleError } from '../util/HandleError.interface';

import { DEFAULT_SERIES } from '../util/series.defaults';

@Component({
  selector: 'hero-explore',
  templateUrl: './hero-explore.component.html',
  styleUrls: ['./hero-explore.component.css']
})
export class HeroExploreComponent implements HandleError{
  @Output() pageLoaded: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number;
  totalPages: number;
  
  results: Hero[];

  series = DEFAULT_SERIES;
  selectedSeries: string;

  private defaultPage = 1;
  private defaultSeriesFilter = 'all';

  private routeChange: Subscription;
  private routerChange: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HeroSearchService,
    private previousRoute: PreviousRouteService
  ) {
    this.results = [];
   }

  ngOnInit() {
    this.routeChange = this.route.queryParams.subscribe(r => {  
      const page: number = r.page ? parseInt(r.page, 10) : this.defaultPage;
      const seriesFilter: string = r.filter ? r.filter : this.defaultSeriesFilter;

      this.currentPage = page;
      this.selectedSeries = seriesFilter;
      this.renderHeroes();
    });

    this.routerChange = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.previousRoute.set({
          filter: this.selectedSeries,
          page: this.currentPage
        });
      }
    });
  }

  ngOnDestroy() {
    this.routeChange.unsubscribe();
    this.routerChange.unsubscribe();
  }

  loadResultsFor(filter: string) {
    this.currentPage = 1;
    this.loadPageResultsFor(this.currentPage, filter);
  }
  
  loadPageResultsFor(page: number, filter: string) {
    const queryFilter = filter ? filter : this.selectedSeries;

    window.scroll(0,0);
    this.router.navigate(
      ['/explore'], { queryParams: { page: page, filter: queryFilter } }
    );
  }

  handleError(error: Error): void {
    console.warn(`Something went wrong: ${error}`);
  }

  private getSeriesFilterId(filter: string): number {
    const series: any[] = this.series.filter(s => s.filter == filter)
    
    return series.length ? series[0].id : 0;
  }

  private renderHeroes() {
    this.results = [];

    this.requestHeroes(this.currentPage, this.selectedSeries).subscribe(r => {
      this.results = r.heroes;
      this.totalPages = r.count;
      this.pageLoaded.emit(this.currentPage);
    }, this.handleError);
  }

  private requestHeroes(forPage: number, forSeries: string): Observable<HeroSearchResult> {
    const offset = forPage == 1 ?  0 : forPage * RESULTS_PER_PAGE;

    if (forSeries == this.defaultSeriesFilter) {
      return this.service.searchAll(30, offset);
    } else {
      const seriesId = this.getSeriesFilterId(forSeries);

      return this.service.searchSeries(30, offset, seriesId);
    }
  }
}
