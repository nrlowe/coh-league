import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from '../models/tournament';
import { map } from 'rxjs/operators';
import { TournamentService } from '../services/tournament.service';
import { BracketsManager } from 'brackets-manager/dist/manager';
import { TournamentDto } from '../models/dto/tournamentdto';
import { PlayerDetails } from '../models/playerdetails';
import { Observer } from 'rxjs';
import { JsonService } from '../services/json-service';
import { SharedTournamentService } from '../services/shared-tournament.service';
import { Router } from '@angular/router';


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
  constructor(private tournamentService: TournamentService, private jsonService : JsonService,
    private sharedService : SharedTournamentService, private router : Router){

  }
  ngOnInit(): void {
    this.retrieveTournaments();
  }

  private retrieveTournaments(){
    this.tournamentService.getAllTournaments().forEach(doc => {
      doc.forEach(tourny => {
        var t = new TournamentDto(tourny.title!, tourny.teamSize!, 
          tourny.playerNumber!, tourny.gameVersion!, tourny.open, tourny.hasImage);
          t.matchTree = tourny.matchTree;
          t.rounds = tourny.rounds;
          t.startDate = tourny.startDate;
          t.endDate = tourny.endDate;
          t.liveStatus = this.checkLiveStatus(t.startDate!, t.endDate!);
          t.creatorKey = tourny.creatorKey;
        this.liveTournaments.push(t);
        this.tournamentDtoList.push(t);
      })
    });
  }

  checkLiveStatus(startDate : string, endDate : string) : boolean {
    const start = new Date(startDate);
    const end = new Date(endDate)
    const today = new Date();
    if(today >= start && today <= end) {
      return true;
    } else {
      return false;
    }
  }

  viewTournament(tournamentDto : TournamentDto){
    var tournamentTree = this.jsonService.convertTournamentDtoToTree(tournamentDto);
    this.sharedService.setViewTournament(tournamentTree);
    this.router.navigate(['/tournament/viewtournament']);
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
