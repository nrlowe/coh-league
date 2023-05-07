import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameDetails } from 'src/app/models/gameDetails';
import { GameWinner } from 'src/app/models/gamewinner';
import { MatchNode } from 'src/app/models/matchnode';
import { PlayerDetails } from 'src/app/models/playerdetails';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent {
  teamSelector : string[] = [];
  previousSelectionHolder? : GameDetails[];
  winningNum : number = 0;
  gameDetailsForm = this.formBuilder.group({
    gameDetails : this.formBuilder.array([])
  })

  constructor(
    public dialogRef: MatDialogRef<EditMatchComponent>,
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatchNode, 
  ) {}
  ngOnInit() : void {
    this.teamSelector.push(this.data.teamOneName!);
    this.teamSelector.push(this.data.teamTwoName!);
    this.previousSelectionHolder = this.data.gameDetails;
    this.winningNum = Math.ceil(this.data.gameDetails!.length / 2);
    this.constructDynamicForm(this.data.gameDetails!);
  }

  constructDynamicForm(gameDetails : GameDetails[]){
    for(var i = 0; i < gameDetails.length; i++){
      var game = gameDetails[i] as GameDetails;
      var gameWinner = "Not Played";
      var gameGroup : FormGroup;
      console.log("GAME WINNER???? " + game.gameWinner)
      if(game.gameWinner){
        gameWinner = game.gameWinner.teamName;
      }
      //first row always enabled
      if(i == 0 || (i > 0 && gameDetails[i].gameWinner)){
        console.log("FORM VALUE:::: " + i + "  NOT DISABLED");
        gameGroup = this.formBuilder.group({
          scoreOne: new FormControl(game.scoreOne, [Validators.min(0), Validators.max(500)]),
          scoreTwo : new FormControl(game.scoreTwo, [Validators.min(0), Validators.max(500)]),
          gameWinner : new FormControl(gameWinner)
        });
      //no previous values + after row one = diabled
      } else {
        console.log("FORM VALUE:::: " + i + "  !!!!!!DISABLED");
        gameGroup = this.formBuilder.group({
          scoreOne : new FormControl(game.scoreOne, [Validators.min(0), Validators.max(500)]),
          scoreTwo : new FormControl(game.scoreTwo, [Validators.min(0), Validators.max(500)]),
          gameWinner : new FormControl(gameWinner)
        });
        gameGroup.disable();
      }
      console.log(gameGroup);
      this.getGameDetailsFormArray().push(gameGroup);
    }
  }

  getGameDetailsFormArray() : FormArray {
    return this.gameDetailsForm.get('gameDetails') as FormArray;
  }

  getGameDetailsFromFormArray(index : number) : FormGroup{
    return this.getGameDetailsFormArray().at(index) as FormGroup;
  }

  winnerSelected(){
    //game.gameWinner = new GameWinner(teamName, playerList, 1);
  }

  saveMatchDetails(){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
