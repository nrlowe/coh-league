import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from '../models/tournament';
import { map } from 'rxjs/operators';
import { TournamentService } from '../services/tournament.service';
import { BracketsManager } from 'brackets-manager/dist/manager';
import { TournamentDto } from '../models/dto/tournamentdto';
import { PlayerDetails } from '../models/playerdetails';
import { Observer } from 'rxjs';


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
@Output() changeRankPage = new EventEmitter<any>(true);

liveTournaments : TournamentDto[] = []; 
rankList : PlayerDetails[] = [];
rankObserver? : Observer<PlayerDetails[]>;
tournamentPromise? : Promise<TournamentDto[]>;
tournamentDtoList : TournamentDto[] = [];
upComingTournaments : TournamentDto[] = [];

@Input() liveTournamentPage = 1;
@Input() upcomingTournamentPage = 1;
@Input() rankingPage = 1;
@Input() tournamentPageSize = 5;
@Input() rankPageSize = 10;

pager: any = {};
  constructor(private tournamentService: TournamentService){

  }
  ngOnInit(): void {
    this.retrieveTournaments();
  }

  private retrieveTournaments(){
    this.tournamentService.getAllTournaments().forEach(doc => {
      doc.forEach(tourny => {
        var t = new TournamentDto(tourny.title!, tourny.teamSize!, 
          tourny.playerNumber!, tourny.gameVersion!, tourny.open, tourny.hasImage);
        this.liveTournaments.push(t);
        this.tournamentDtoList.push(t);
      })
    });
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
