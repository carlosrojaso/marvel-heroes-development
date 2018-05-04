import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroExploreComponent } from './hero-explore.component';

describe('HeroExploreComponent', () => {
  let component: HeroExploreComponent;
  let fixture: ComponentFixture<HeroExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
