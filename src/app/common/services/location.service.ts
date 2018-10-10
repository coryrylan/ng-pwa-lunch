import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor() { }

  getLocation() {
    return new Observable<Coordinates>(observer => {
      navigator.geolocation.getCurrentPosition(location => {
        observer.next(location.coords);
        observer.complete();
      });
    });

    // return of({
    //   latitude: 38.5285941,
    //   longitude: -90.9974369
    // });
  }
}
