import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showMenu = false;
  showUpdatePrompt: Observable<any>;

  constructor(private swUpdate: SwUpdate) {
    this.showUpdatePrompt = this.swUpdate.available;
  }

  update() {
    window.location.reload();
  }
}
