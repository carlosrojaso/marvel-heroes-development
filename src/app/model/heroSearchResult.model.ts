import { Hero } from './hero.model';

export class HeroSearchResult {
    count: number;
    heroes: Hero[];
    
    constructor(count: number, heroes: Hero[]) {
        this.count = count;
        this.heroes = heroes;
    }
}