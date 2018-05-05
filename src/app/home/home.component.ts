import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleError } from '../util/HandleError.interface';
import { HeroSearchService } from '../service/herosearch.service';
import { Hero } from '../model/hero.model';
import { HeroSearchResult } from '../model/heroSearchResult.model';
import { DEFAULT_HEROES } from '../hero/hero.defaults';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, HandleError {
  results: Hero[];

  constructor(private service: HeroSearchService) { 
    this.results = [];
  }

  ngOnInit() {
    DEFAULT_HEROES.forEach(heroId => this.loadHero(heroId));
  }

  private loadHero(id: number) {
    this.searchHero(id).subscribe(
      h => {
        this.results.push(h.heroes[0]);
      },
      this.handleError
    );
  }

  private searchHero(id: number): Observable<HeroSearchResult> {
    return this.service.searchHero(id)
  }

  handleError(error: Error): void {
    console.warn(`Something went wrong: ${error}`);
  }
}
