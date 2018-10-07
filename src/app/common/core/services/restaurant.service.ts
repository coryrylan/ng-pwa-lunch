import { Restaurant } from './restaurant.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, concatMap, switchMap } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { LocationService } from './location.service';

export interface Restaurant {
  id: string;
  name: string;
  phoneNumber: string;
  rating: number;
  reviews: {}[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    openNow: boolean,
    weekdays: string[]
  };
}

export interface ListResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    },
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      },
      southwest: {
        lat: number;
        lng: number;
      }
    }
  };
  icon: string;
  id: string;
  name: string;
  opening_hours?: {
    open_now: boolean,
    weekday_text: string[]
  };
  photos: [
    {
      height: number,
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }
  ];
  place_id: string;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  vicinity: string;
}

export interface DetailResult {
  adr_address: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  icon: string;
  id: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  price_level: number;
  rating: number;
  reference: string;
  reviews: {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }[];
  scope: string;
  types: string[];
  url: string;
  utc_offset: number;
  vicinity: string;
  website: string;
}

const radius = 10 * 1609.34; // meters per mile

@Injectable()
export class RestaurantService {
  constructor(
    private httpClient: HttpClient,
    private locationService: LocationService
  ) { }

  searchByGeoLocation(): Observable<Restaurant[]> {
    return this.locationService.getLocation().pipe(
      concatMap(location => this.httpClient.get<{ results: any }>(`${environment.searchApiUrl}/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=restaurant`)), // tslint:disable:max-line-length
      map(data => this.convertListResultsToRestaurants(data.results)),
      map(r => this.sort(r))
    );
  }

  load(id: string): Observable<Restaurant> {
    return this.httpClient.get<{ result: DetailResult }>(`${environment.searchApiUrl}/maps/api/place/details/json?placeid=${id}`).pipe(
      map(i => this.convertDetailResultToRestaurant(i.result))
    );
  }

  private sort(restaurants: Restaurant[]) {
    return restaurants.sort((a, b) => b.rating - a.rating);
  }

  private convertDetailResultToRestaurant(result: DetailResult): Restaurant {
    const restaurant: Restaurant = {
      id: result.place_id,
      name: result.name,
      phoneNumber: result.formatted_phone_number,
      rating: result.rating,
      reviews: result.reviews,
      address: result.formatted_address,
      coordinates: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
      },
      openingHours: result.opening_hours ? {
        openNow: result.opening_hours.open_now,
        weekdays: result.opening_hours.weekday_text
      } : undefined
    };

    return restaurant;
  }

  private convertListResultsToRestaurants(results: ListResult[]) {
    return results.map(result => {
      const restaurant: Restaurant = {
        id: result.place_id,
        name: result.name,
        phoneNumber: '',
        rating: result.rating,
        reviews: [],
        address: result.vicinity,
        coordinates: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        openingHours: result.opening_hours ? {
          openNow: result.opening_hours.open_now,
          weekdays: result.opening_hours.weekday_text
        } : undefined
      };

      return restaurant;
    });
  }
}
