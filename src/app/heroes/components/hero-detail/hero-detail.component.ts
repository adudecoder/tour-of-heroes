import { HeroService } from '../../../core/services/hero.service';
import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../core/models/hero.module';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

    hero!: Hero;
    isEditing = false;

    form = this.fb.group({
        id: [{ value: '', disabled: true }],
        name: ['', [Validators.required, Validators.minLength(3)]]
    });

    constructor(
        private fb: FormBuilder,
        private heroService: HeroService,
        private location: Location,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const paramId = this.route.snapshot.paramMap.get('id')

        if (paramId !== 'new') {
            this.isEditing = true;
            const id = Number(paramId);
            this.heroService.getOne(id).subscribe((hero) => {
                this.hero = hero;
                this.form.controls['id'].setValue(hero.id);
                this.form.controls['name'].setValue(hero.name);
            });
        }

    }

    goBack(): void {
        this.location.back();
    }

    create(): void {

        const { valid, value } = this.form;

        if (valid) {
            const hero: Hero = {
                name: value.name
            } as Hero;
            
            this.heroService.create(hero).subscribe(() => this.goBack());
        } else {
            this.showErrorMsg();
        }
    }

    update(): void {

        const { valid, value } = this.form;

        if (valid) {
            const hero: Hero = {
                id: this.hero.id,
                name: value.name
            }
            
            this.heroService.update(hero).subscribe(() => this.goBack());
        } else {
            this.showErrorMsg();
        }

    }

    // Private methods always at the end of the file
    private showErrorMsg(): void {
        this.snackBar.open('Please check the errors found.', 'OK', {
            duration: 5000,
            verticalPosition: 'top'
        });
    }

}
