import { Component, OnInit } from '@angular/core';
import { HeroSearchService } from '../service/herosearch.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading: boolean;

  constructor(private service: HeroSearchService) { 
    this.service.loadingResults.subscribe(s => this.toggle(s));
  }
  
  ngOnInit() {
    this.isLoading = false;
  }

  private toggle(state: boolean) {
    this.isLoading = state;
  }
}
