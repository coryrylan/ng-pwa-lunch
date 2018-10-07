import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../common/shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
