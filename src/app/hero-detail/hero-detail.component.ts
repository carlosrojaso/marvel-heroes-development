import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../model/hero.model';
import { HeroSearchService } from '../service/herosearch.service';
import { PreviousRouteService } from '../service/previous-route.service';
import { HandleError } from '../util/HandleError.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements HandleError {
  hero: Hero;
  backRoute: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HeroSearchService,
    private previousRoute: PreviousRouteService
  ) {
    route.params.subscribe(p => { 
      this.service.searchHero(p.id).subscribe(h => {
        this.hero = h.heroes[0];
      }, this.handleError);
    });

    this.backRoute = this.previousRoute.get();
  }

  handleError(error: Error): void {
    console.warn(`Something went wrong: ${error}`);
  }

  goBack(): boolean {
    const route = this.previousRoute.get();

    if ('page' in route) {
      this.router.navigate(
        ['explore'],
        { queryParams: { page: route.page, filter: route.filter } }
      );
    } else {
      this.router.navigate(['/']);
    }

    return false;    
  }
}
