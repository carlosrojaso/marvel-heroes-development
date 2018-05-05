import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { HeroSearchService } from '../service/herosearch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'explore-filter',
  templateUrl: './explore-filter.component.html',
  styleUrls: ['./explore-filter.component.css']
})
export class ExploreFilterComponent {
  @Output() onSelectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() options: any[];
  @Input() selected: string;
  @HostBinding('style.display') display: string;
  private loadingSub: Subscription;
  
  // @TODO: Repeated code on here and paginator.component.
  // Refactor to Directive or similar.
  constructor(private service: HeroSearchService) {
    this.loadingSub = service.loadingResults.subscribe(s => {
      this.display = s ? 'none' : 'block';
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  onSelection() {
    this.onSelectionChange.emit(this.selected);
  }
}
