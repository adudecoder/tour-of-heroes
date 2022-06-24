import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroesRoutingModule } from './heroes-routing.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [HeroesComponent, HeroDetailComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HeroesRoutingModule,
        FlexLayoutModule,
    ],
})
export class HeroesModule {}