import { LoadingService } from './loading.service';
import { environment } from './../../../environments/environment';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
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
            .get<Hero>(`${this.heroesUrl}/${id}`)
            .pipe(
                tap((hero) =>
                    this.log(`fetched hero id=${id} and name=${hero.name}`)
                )
            );

        // const hero = HEROES.find((hero) => hero.id === id)!;
        // this.log(`fetched hero id=${id}`);
        // return of(hero);
    }

    // PUT /heroes/id
    update(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero).pipe(
            tap((hero) => this.log(`update hero id=${hero.id} and name=${hero.name}`))
        );
    }

    private log(message: string): void {
        this.messageService.add(`HeroService: ${message}`);
    }
}
