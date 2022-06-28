import { HeroService } from '../../../core/services/hero.service';
import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../core/models/hero.module';

@Component({
    selector: 'app-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

    hero!: Hero;

    constructor(
        private heroService: HeroService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.heroService.getOne(id).subscribe((hero) => (this.hero = hero));
    }

    goBack(): void {
        this.location.back();
    }

    isFormValid(): boolean {
        return !!this.hero.name.trim()
    }

    // se vier vazio = ''
    // negar o vazio 1x = ! => true
    // negar o vazio 2x = !! => false

    save(): void {
        this.heroService.update(this.hero).subscribe(() => this.goBack());
    }

}
