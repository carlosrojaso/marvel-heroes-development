import { Component, Output, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeroSearchService } from '../service/herosearch.service';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnChanges {
  @Output() onNext: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPrevious: EventEmitter<number> = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() totalPages: number;
  @HostBinding('style.display') display: string;
  
  pagesArray: number[];
  private loadingSub: Subscription;
  
  
  constructor(private service: HeroSearchService) { 
    this.loadingSub = service.loadingResults.subscribe(s => {
      this.display = s ? 'none' : 'block';
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalPages) {
      this.pagesArray = Array.from({length: changes.totalPages.currentValue}, (v, k) => k+1)
    }
  }

  next(): boolean {
    // Fix overflow on max number of pages
    this.onNext.emit(this.currentPage + 1);

    return false;
  }

  previous(): boolean {
    const page = this.currentPage - 1 <= 0 ? 1 : this.currentPage - 1;
    this.onNext.emit(page);

    return false;
  }

  goTo(page: number): boolean {
    this.onNext.emit(page);

    return false;
  }
}
