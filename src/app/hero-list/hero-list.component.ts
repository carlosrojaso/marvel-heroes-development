import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../model/hero.model';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  @Input() heroes: Hero[];
  constructor() { }

  ngOnInit() {
  }

}
