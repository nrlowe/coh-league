import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerDetails } from 'src/app/models/playerdetails';
import { PlayerService } from 'src/app/services/player-service';

@Component({
  selector: 'app-addupdateplayer',
  templateUrl: './addupdateplayer.component.html',
  styleUrls: ['./addupdateplayer.component.css']
})
export class AddupdateplayerComponent {
  private newPlayer : PlayerDetails = new PlayerDetails();
  newPlayerForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<AddupdateplayerComponent>, private playerService : PlayerService){
      this.newPlayerForm = new FormGroup({
        playerName : new FormControl('',[Validators.required]),
        steamId : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{17}$')])
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNewTournament(): void {
    if(this.newPlayerForm!.valid){
      this.convertFormToPlayer();
      this.playerService.addNewPlayer(this.newPlayer);
      this.dialogRef.close(this.newPlayer);
    }
  }

  hasError(controlName : string, errorName : string){
    //return this.tournamentForm.controls[controlName].hasError(errorName);
  }

  convertFormToPlayer(){
    this.newPlayer.playerName = this.newPlayerForm?.get('playerName')?.value;
    this.newPlayer.steamId = this.newPlayerForm?.get('steamId')?.value;
    this.newPlayer.points = 0;
  }
}
