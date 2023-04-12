import { Component, Inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';

// @NgModule({
//   providers: [
//     {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
//   ]
// })
@Component({
  selector: 'app-createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.css']
})
export class CreatetournamentComponent {
  private tournament : TournamentTree = new TournamentTree();
  tournamentForm : FormGroup;
  constructor(public dialogRef: MatDialogRef<CreatetournamentComponent>){
      this.tournamentForm = new FormGroup({
        tournamentTitle : new FormControl('',[Validators.required, Validators.minLength(4)]),
        tournamentGame : new FormControl('',[Validators.required]),
        tournamentGameFormat : new FormControl('',[Validators.required]),
        tournamentPlayerNum : new FormControl('',[Validators.required]),
        tournamentTeamSize : new FormControl('',[Validators.required])
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNewTournament(): void {
    if(this.tournamentForm.valid){
      this.tournament = this.tournamentForm.value;
      console.log(this.tournament.title);
      this.dialogRef.close(this.tournament);
    }
    
    
  }

  hasError(controlName : string, errorName : string){
    return this.tournamentForm.controls[controlName].hasError(errorName);
  }

  // hasGameFormatError(){
    
  // }

  // hasGameVersionError(){
    
  // }

  // hasNumberOfPlayersError(){
    
  // }


}
