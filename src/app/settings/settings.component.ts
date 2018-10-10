import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  distance: Observable<number>;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      distance: [10]
    });

    this.distance = this.settingsForm.controls.distance.valueChanges.pipe(startWith(10));
  }

}
