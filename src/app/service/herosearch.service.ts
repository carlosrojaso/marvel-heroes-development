import { Injectable, Inject, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // Solves the issue with map on Observables

import { HeroSearchResult } from '../model/heroSearchResult.model';
import { Hero } from '../model/hero.model';

import { RESULTS_PER_PAGE } from '../service/herosearch.service.config'; // This may need renaming

export const PUBLIC_API_KEY: string = "";
export const PRIVATE_API_KEY: string = "";
export const API_URL: string = "https://gateway.marvel.com/v1/public/";
export const API_URL_CHARS: string = "https://gateway.marvel.com/v1/public/characters";
export const API_URL_SERIES: string = "https://gateway.marvel.com/v1/public/series";

@Injectable()
export class HeroSearchService {
  @Output() loadingResults: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    @Inject(PUBLIC_API_KEY) private publicApiKey: string,
    @Inject(PRIVATE_API_KEY) private privateApiKey: string,
    @Inject(API_URL) private apiUrl: string,
    @Inject(API_URL_CHARS) private apiUrlChars: string,
    @Inject(API_URL_SERIES) private apiUrlSeries: string
  ) { 
  }

  searchHero(heroId: number): Observable<HeroSearchResult> {
    const url = `${this.apiUrlChars}/${heroId}`;

    return this.query(url);
  }

  searchSeries(limit = 30, offset = 0, serieId: number): Observable<HeroSearchResult> {
    const url = `${this.apiUrlSeries}/${serieId}/characters`;

    return this.searchWithParams(url, limit, offset);
  }

  searchAll(limit = 30, offset = 0): Observable<HeroSearchResult> {
    return this.searchWithParams(this.apiUrlChars, limit, offset);
  }

  private searchWithParams(url: string, limit = 30, offset = 0): Observable<HeroSearchResult> {
    const params = [
      `limit=${limit}`,
      `offset=${offset}`
    ];

    return this.query(url, params);
  }

  private query(
    url: string,
    requestParams = []
  ): Observable<HeroSearchResult> {
    const ts: number = + new Date();
    const authParams = [
      `apikey=${ this.publicApiKey }`,
      `ts=${ ts }`,
      `hash=${ this.generateHash(ts) }`
    ];
    const queryParams = requestParams.concat(authParams).join('&');
    const queryUrl: string = `${url}?${queryParams}`;

    console.log(`API Call: ${ queryParams }`);

    this.loadingResults.emit(true);
   
    return this.http.get(queryUrl).map(
      res => {
        const data = res['data'];
        const results = data['results'];
        let heroes: Hero[] = []

        this.loadingResults.emit(false);

        results.map(hero => {
          heroes.push(new Hero({
            id: hero.id,
            name: hero.name,
            description: hero.description,
            thumbnail: hero.thumbnail
          }));
        });

        return new HeroSearchResult(Math.floor(data.total / RESULTS_PER_PAGE), heroes);
      }
    );
  }

  private generateHash(timestamp: number): string | Int32Array {
    return Md5.hashStr(timestamp + this.privateApiKey + this.publicApiKey);
  }
}
