import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { TournamentService } from 'src/app/services/tournament.service';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { CreatetournamentComponent } from 'src/app/dialog/tournament/createtournament/createtournament.component';


@Component({
  selector: 'createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.css']
})
export class CreateTournament {

  tournament?: TournamentTree;
  submitted = false;
  tournamentDetails? : TournamentDetails;

  constructor(private tournamentService: TournamentService, private editTournamentService : EditTournamentService
    ,private sharedTournamentService : SharedTournamentService, private router : Router,
    public dialog : MatDialog) { }

  // saveTutorial(): void {
  //   this.tournamentService.create(this.tournament).then(() => {
  //     console.log('Created new item successfully!');
  //     this.submitted = true;
  //   });
  // }

  // newTutorial(): void {
  //   this.submitted = false;
  //   this.tournament = new Tournament(4);
  // }

  // createNewTournament(newTournament : Tournament){
  //   var tournamentTree = this.editTournamentService.createNewTournament(newTournament);
    
  //   this.sharedTournamentService.setNewTournament(tournamentTree);
  //   this.router.navigate(['/viewtournament', tournamentTree]);
  // }

  createNewtournament(){
    this.tournament = new TournamentTree;
    const dialogRef = this.dialog.open(CreatetournamentComponent, {
      data : this.tournament,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tournament = result;
    })
  }
}
