import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';


const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
const idApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const ranApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

@Injectable({
    providedIn: 'root'
})
export class CocktailApiService {

    constructor(private http: HttpClient) {
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getCocktail(): Observable<any> {
        return this.http.get(apiUrl).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getCocktailById(id: string): Observable<any> {
        const url = `${idApiUrl}${id}`;
        return this.http.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getRandCocktail(): Observable<any> {
        return this.http.get(ranApiUrl).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }
}
