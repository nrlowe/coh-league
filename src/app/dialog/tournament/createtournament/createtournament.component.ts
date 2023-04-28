import { formatDate } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
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
  private tournament? : TournamentDetails;
  tournamentForm : FormGroup;
  page : number = 1;
  dateformat : string = "dd/MM/yyyy";
  //TODO: If times are introduced - allow region select? pull from local storage?
  local : string = "en-US";
  constructor(public dialogRef: MatDialogRef<CreatetournamentComponent>){
      this.tournamentForm = new FormGroup({
        pageOne : new FormGroup({
          tournamentTitle : new FormControl('',[Validators.required, Validators.minLength(4)]),
          tournamentDescription : new FormControl(undefined),
          tournamentGame : new FormControl('',[Validators.required]),
          tournamentGameFormat : new FormControl('',[Validators.required]),
        }),
        pageTwo : new FormGroup({
          tournamentPlayerNum : new FormControl('',[Validators.required]),
          tournamentTeamSize : new FormControl('',[Validators.required]),
          tournamentStartDate : new FormControl<Date | null>(null, [Validators.required]),
          tournamentEndDate : new FormControl<Date | null>(null, [Validators.required]),
        }),
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToNextPage(){
    if(this.tournamentForm.get('pageOne')!.valid){
      this.page = 2;
    }
  }

  goToPreviousPage(){
    this.page = 1;
  }

  submitNewTournament(): void {
    if(this.tournamentForm.valid){
      this.convertFormToTournamentTree();
      this.dialogRef.close(this.tournament);
    }
    
    
  }

  hasError(controlName : string, errorName : string){
  }

  convertFormToTournamentTree(){
    var pageOne = this.tournamentForm.get('pageOne');
    var pageTwo = this.tournamentForm.get('pageTwo');
    this.tournament = new TournamentDetails(pageOne?.get('tournamentTitle')?.value, 
    pageTwo?.get('tournamentTeamSize')?.value, 
    pageOne?.get('tournamentGameFormat')?.value,
    pageTwo?.get('tournamentPlayerNum')?.value, 
    pageOne?.get('tournamentGame')?.value,
    true);
    if(pageOne?.get('tournamentDescription')){
      this.tournament.description = pageOne?.get('tournamentDescription')?.value
    }
    this.tournament.startDate = formatDate(pageTwo?.get('tournamentStartDate')?.value, this.dateformat, this.local);
    this.tournament.endDate = formatDate(pageTwo?.get('tournamentEndDate')?.value, this.dateformat, this.local);
  }


}
