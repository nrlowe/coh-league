import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';

@Component({
  selector: 'app-edittournament',
  templateUrl: './edittournament.component.html',
  styleUrls: ['./edittournament.component.css']
})
export class EdittournamentComponent {
  editTournament? : any;
  bracketView : boolean = false;
  constructor(private sharedTournamentService : SharedTournamentService, private router : Router){

  }

  ngOnInit(){
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.editTournament = data;
    });
  }

  proceedToView(tournamentTree : TournamentTree) {
    this.sharedTournamentService.setNewTournament(tournamentTree);
    this.router.navigate(['/viewtournament']);
  }
}

//get tournament, get players(for specified game)
//option to create new player/update player(if current steam name is wrong) check via steam id