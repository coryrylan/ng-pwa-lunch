import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { RestaurantService } from './../../common/services/restaurant.service';
import { Restaurant } from './../../common/interfaces';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  form: FormGroup;
  restaurants: Observable<Restaurant[]>;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: []
    });

    this.restaurants = this.restaurantService.searchByGeoLocation().pipe(
      shareReplay(),
      map(r => {
        r.unshift(r[Math.floor(Math.random() * r.length)]);
        return r;
      })
    );
  }
}
