import { Component, Input } from '@angular/core';
import { Hero } from '../model/hero.model';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() hero: Hero;
  constructor() { }
}
