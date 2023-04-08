import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { TournamentService } from 'src/app/services/tournament.service';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.css']
})
export class CreateTournament {

  tournament: Tournament = new Tournament(4);
  submitted = false;
  tournamentDetails? : TournamentDetails;

  constructor(private tournamentService: TournamentService, private editTournamentService : EditTournamentService
    ,private router : Router) { }

  saveTutorial(): void {
    this.tournamentService.create(this.tournament).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tournament = new Tournament(4);
  }

  createNewTournament(newTournament : Tournament){
    var tournamentTree = this.editTournamentService.createNewTournament(newTournament);
    this.router.navigate(['/viewtournament', newTournament]);
  }
}
