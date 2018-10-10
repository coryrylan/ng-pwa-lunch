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
