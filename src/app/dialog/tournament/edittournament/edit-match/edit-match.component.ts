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
      var gameGroup : FormGroup;
      //first row always enabled
      if(i == 0 || (i > 0 && game.gameWinner)){
        gameGroup = this.formBuilder.group({
          scoreOne: new FormControl(game.scoreOne, [Validators.min(0), Validators.max(500)]),
          scoreTwo : new FormControl(game.scoreTwo, [Validators.min(0), Validators.max(500)]),
          gameWinner : new FormControl(game.gameWinner)
        });
      //no previous values + after row one = diabled
      } else {
        gameGroup = this.formBuilder.group({
          scoreOne : new FormControl(game.scoreOne, [Validators.min(0), Validators.max(500)]),
          scoreTwo : new FormControl(game.scoreTwo, [Validators.min(0), Validators.max(500)]),
          gameWinner : new FormControl(null)
        });
        gameGroup.disable();
      }
      this.getGameDetailsFormArray().push(gameGroup);
    }
  }

  getGameDetailsFormArray() : FormArray {
    return this.gameDetailsForm.get('gameDetails') as FormArray;
  }

  teamNameValue(index : number) : string{
    return this.getGameDetailsFormArray().at(index).get('gameWinner')?.value;
  }

  winnerSelected(index : number){
    if(index + 1 <= this.data.gameDetails!.length){
      this.getGameDetailsFormArray().at(index + 1).enable();
    }
  }

  saveMatchDetails(){
    if(this.gameDetailsForm.valid){
      for(var i = 0; i < this.data.gameDetails!.length; i++){
        var game = this.data.gameDetails![i];
        var gameGroup = this.getGameDetailsFormArray().at(i);
        if(gameGroup.get('scoreOne')?.value){
          game.scoreOne = gameGroup.get('scoreOne')?.value;
        }
        if(gameGroup.get('scoreTwo')?.value){
          game.scoreTwo = gameGroup.get('scoreTwo')?.value;
        }
        if(gameGroup.get('gameWinner')?.value){
          this.increaseScore(gameGroup.get('gameWinner')?.value, game);
        }
        this.checkForMatchWinner();
      }
      this.dialogRef.close(this.data);
    }
  }

  private checkForMatchWinner(){
    if(this.data.teamOneScore! >= this.winningNum){
      this.data.hasWinner = true;
      this.data.winner = new GameWinner(this.data.teamOneName!, this.data.teamOne!, 1);
      this.data.teamOneWin = true;
    } else if(this.data.teamTwoScore! >= this.winningNum){
      this.data.hasWinner = true;
      this.data.winner = new GameWinner(this.data.teamTwoName!, this.data.teamTwo!, 2);
      console.log("TEAM TWO WIN");
      this.data.teamTwoWin = true;
    } else {
      this.data.hasWinner = false;
      this.data.winner = undefined;
      this.data.teamOneWin = false;
      this.data.teamTwoWin = false;
    }
  }

  //refactor model so these method isnt needed
  increaseScore(teamName : string, game : GameDetails){
    //is there a previous winner?
    if(game.gameWinner){
      //if change
      if(game.gameWinner != teamName){
        if(teamName == this.data.teamOneName){
          this.data.teamOneScore! += 1;
          this.data.teamTwoScore! -= 1;
        } else {
          this.data.teamTwoScore! += 1;
          this.data.teamOneScore! -= 1;
        }
      }
    } else {
      if(teamName == this.data.teamOneName){
        this.data.teamOneScore! += 1;
      } else {
        this.data.teamTwoScore! += 1;
      }
    }
    game.gameWinner = teamName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
