import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RestaurantService, Restaurant } from './../../common/core/services/restaurant.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  restaurant: Observable<Restaurant>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurant = this.activatedRoute.params.pipe(
      switchMap(params => this.restaurantService.load(params['id']))
    );
  }
}
