import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero.module';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

    constructor(private messageService: MessageService) {}

    getHeroes(): Observable<Hero[]> { // Retornando um Observable de uma lista de Hero
        const heroes = of(HEROES);
        this.messageService.add('HeroService: fetched heroes');
        return heroes;
    }

    getHero(id: number): Observable<Hero> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hero = HEROES.find(hero => hero.id === id)!;
        this.messageService.add(`HeroService: fetched hero id=${id}`)
        return of(hero);
    }

}
