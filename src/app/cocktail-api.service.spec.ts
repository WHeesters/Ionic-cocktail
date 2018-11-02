import {TestBed} from '@angular/core/testing';

import {CocktailApiService} from './cocktail-api.service';

describe('CocktailApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CocktailApiService = TestBed.get(CocktailApiService);
        expect(service).toBeTruthy();
    });
});
