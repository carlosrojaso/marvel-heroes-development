import { Injectable } from '@angular/core';

@Injectable()
export class PreviousRouteService {
  route: any;
  constructor() { 
    this.route = {};
  }

  set(value: any) {
    this.route = value;
  }

  get(): any {
    return this.route;
  }
}
