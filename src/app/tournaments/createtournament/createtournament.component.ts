import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.css']
})
export class CreateTournament {

  tournament: Tournament = new Tournament();
  submitted = false;

  constructor(private tournamentService: TournamentService) { }

  saveTutorial(): void {
    this.tournamentService.create(this.tournament).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tournament = new Tournament();
  }
}
