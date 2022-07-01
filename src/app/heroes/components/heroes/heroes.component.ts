import { ConfirmationDialogComponent } from './../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from './../../../core/models/dialog-data.model';
import { HeroService } from '../../../core/services/hero.service';
import { Hero } from '../../../core/models/hero.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  constructor(private dialog: MatDialog, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {

    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete '${hero.name}'?`
    };

    const dialoRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px'
    });

    dialoRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.delete(hero).subscribe(() => {
          this.getHeroes();
        })
      }
    })
  }

}
