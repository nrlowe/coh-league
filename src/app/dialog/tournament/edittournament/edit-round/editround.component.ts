import { Component, OnInit, Input, Inject } from '@angular/core';
import { RoundDetails } from 'src/app/models/rounddetails';
import { RoundNode } from 'src/app/models/roundnode';
import { MatchNode } from 'src/app/models/matchnode';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPseudoCheckbox } from '@angular/material/core';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from 'src/app/models/gameDetails';

@Component({
  selector: 'app-edit-round',
  templateUrl: './editround.component.html',
  styleUrls: ['./editround.component.css']
})
export class EditRoundComponent {
  roundForm = new FormGroup({
    roundName : new FormControl(this.data.roundName,[Validators.required, Validators.minLength(4)]),
    roundDate : new FormControl(this.data.date,[Validators.required]),
    roundFormat : new FormControl(this.data.roundFormat, [Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<EditRoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoundNode,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasError(controlName : string, errorName : string){
  }

  saveRoundDetails(){
    if(this.roundForm.valid){
      if(this.data.roundName != this.roundForm.get('roundName')!.value){
        this.data.roundName = this.roundForm.get('roundName')!.value as string;
      }
      if(this.data.date != this.roundForm.get('roundDate')!.value){
        this.data.date = this.roundForm.get('roundDate')!.value as string;
      }
      if(this.data.roundFormat != this.roundForm.get('roundFormat')!.value){
        this.data.roundName = this.roundForm.get('roundName')!.value as string;
        var newFormat = this.roundForm.get('roundFormat')!.value as number;
        for(let match of this.data.matchs){
          var newGameFormatArray = [];
          for(var i = 0; i < newFormat; i++){
            var newGameDetails = new GameDetails(i + 1);
            if(match.gameDetails![i]){
              newGameDetails = match.gameDetails![i];
            }
            newGameFormatArray.push(newGameDetails);
          }
          match.gameDetails = newGameFormatArray;
        }
      }
      this.dialogRef.close(this.data);
    }
  }
}
