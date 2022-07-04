import { LoadingService } from './loading.service';
import { environment } from './../../../environments/environment';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { finalize, Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    private heroesUrl = `${environment.baseUrl}/heroes`;

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    // GET /heroes
    getAll(): Observable<Hero[]> {
        // Retornando um Observable de uma lista de Hero

        return this.http
            .get<Hero[]>(this.heroesUrl)
            .pipe(
                tap((heroes) => this.log(`fetched ${heroes.length} heroes`)));
    }

    // GET /heroes/id
    getOne(id: number): Observable<Hero> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        return this.http
            .get<Hero>(this.getUrl(id))
            .pipe(
                tap((hero) =>
                    this.log(`fetched ${this.descAttributes(hero)}`)
                )
            );

        // const hero = HEROES.find((hero) => hero.id === id)!;
        // this.log(`fetched hero id=${id}`);
        // return of(hero);
    }

    // GET /heroes?name=term
    search(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`)
        .pipe(
            tap((heroes) =>

                heroes.length
                    ? this.log(`found ${heroes.length} heroes matching "${term}"`)
                    : this.log(`no heroes matching "${term}"`)
            )
        );
    }

    // POST /heroes
    create(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero).pipe(
            tap((hero) => this.log(`update ${this.descAttributes(hero)}`))
        );
    }

    // PUT /heroes/id
    update(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
            tap((hero) => this.log(`update ${this.descAttributes(hero)}`))
        );
    }

    // DELETE /heroes/id
    delete(hero: Hero): Observable<any> {
        return this.http.delete<any>(this.getUrl(hero.id)).pipe(
            tap(() => this.log(`deleted ${this.descAttributes(hero)}`)));
    }

    private descAttributes(hero: Hero): string {
        return `Hero ID=${hero.id} and Name=${hero.name}`;
    }

    private log(message: string): void {
        this.messageService.add(`HeroService: ${message}`);
    }

    private getUrl(id: number): string {
        return `${this.heroesUrl}/${id}`;
    }

}
