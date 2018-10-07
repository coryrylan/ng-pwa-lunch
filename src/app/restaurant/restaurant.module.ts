import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../common/shared/shared.module';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantViewComponent } from './restaurant-view/restaurant-view.component';

const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: ':id', component: RestaurantViewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantListComponent, RestaurantViewComponent]
})
export class RestaurantModule { }
