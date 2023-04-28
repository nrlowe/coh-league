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
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.css']
})
export class CreateTournament {

  tournament: TournamentTree = new TournamentTree();
  submitted = false;

  constructor(private sharedTournamentService : SharedTournamentService, 
    private editTournamentService : EditTournamentService, private router : Router,
    public dialog : MatDialog) { }

  createNewtournament(){
    const dialogRef = this.dialog.open(CreatetournamentComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.tournament = this.editTournamentService.createNewTournament(result);
        this.sharedTournamentService.setNewTournament(this.tournament);
        this.router.navigate(['/edittournament']);
      }
    })
  }
}
