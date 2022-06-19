import { HeroService } from './../hero.service';
import { Hero } from './../hero.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name'];
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) {

    }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
       this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }

}
