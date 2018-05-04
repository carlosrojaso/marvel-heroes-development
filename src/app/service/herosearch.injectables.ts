import {
    HeroSearchService,
    PUBLIC_API_KEY,
    PRIVATE_API_KEY,
    API_URL,
    API_URL_CHARS,
    API_URL_SERIES
} from './herosearch.service';

export const HeroSearchInjectables: Array<any> = [
    { provide: HeroSearchService, useClass: HeroSearchService },
    { provide: PUBLIC_API_KEY, useValue: PUBLIC_API_KEY },
    { provide: PRIVATE_API_KEY, useValue: PRIVATE_API_KEY },
    { provide: API_URL, useValue: API_URL },
    { provide: API_URL_CHARS, useValue: API_URL_CHARS },
    { provide: API_URL_SERIES, useValue: API_URL_SERIES }
];