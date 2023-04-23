import { Component, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament';
import { map } from 'rxjs/operators';
import { TournamentService } from '../services/tournament.service';
import { BracketsManager } from 'brackets-manager/dist/manager';


@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
//only allow single elim currently
//live / upcoming
// then signups? 
//past?
  tournaments? : Tournament[]
  constructor(private tournamentService: TournamentService){

  }
  ngOnInit(): void {
    // this.retrieveTutorials();
  }
  
  ngOnDestroy(){}

    // retrieveTutorials(): void {
    //   this.tournamentService.getAll().snapshotChanges().pipe(
    //     map(changes =>
    //       changes.map(c =>
    //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //       )
    //     )
    //   ).subscribe(data => {
    //     this.tournaments = data;
    //   });
 // }
}
