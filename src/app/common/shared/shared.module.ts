import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxNavDrawerModule } from '@ngx-lite/nav-drawer';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { NgxLoadersModule } from '@ngx-lite/loaders';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  NgxNavDrawerModule,
  NgxInputStarRatingModule,
  NgxLoadersModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  declarations: []
})
export class SharedModule { }
