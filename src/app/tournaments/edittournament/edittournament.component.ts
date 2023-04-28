import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';
import { MatchNode } from 'src/app/models/matchnode';
import { RoundNode } from 'src/app/models/roundnode';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { PlayerService } from 'src/app/services/player-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PlayerDetails } from 'src/app/models/playerdetails';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { toResult } from 'brackets-manager/dist/helpers';
import { AddupdateplayerComponent } from 'src/app/dialog/player/addupdateplayer/addupdateplayer.component';

@Component({
  selector: 'app-edittournament',
  templateUrl: './edittournament.component.html',
  styleUrls: ['./edittournament.component.css']
})
export class EdittournamentComponent {
  @Input() playerNameInput = '';
  roundOneForm = this.formBuilder.group({
      matchs : this.formBuilder.array([])
  });
  editTournament! : any;
  teamFormat? : any;
  playerList? : Promise<PlayerDetails[]>;
  public players : PlayerDetails[] = [];
  roundOneMatchNum : number = 0;
  constructor(private sharedTournamentService : SharedTournamentService, 
    private editTournamentService : EditTournamentService, 
    private playerService : PlayerService,
    private formBuilder : FormBuilder,
    private router : Router,  public dialog : MatDialog){

  }

  async ngOnInit(){
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.editTournament = data;
    });
    await this.retrievePlayers();
    this.teamFormat = Array(this.editTournament.teamSize).fill(0).map((x,i)=>i);
    this.roundOneMatchNum = this.editTournament.rounds[0].matchs.length;
    this.constructDynamicForm(this.editTournament.rounds![0]);
  }
  
  getMatchs() : FormArray {
    return this.roundOneForm.get('matchs') as FormArray;
  }

  getTeamOnePlayers(index : number) : FormArray{
    return this.getMatchs().at(index).get('teamOnePlayers') as FormArray;
  }

  getTeamTwoPlayers(index : number) : FormArray {
    return this.getMatchs().at(index).get('teamTwoPlayers') as FormArray;
  }

  addorUpdatePlayer(){
    //handle error message for player already exists?
    const dialogRef = this.dialog.open(AddupdateplayerComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.open){
      }
    })
  }

  constructDynamicForm(rounds : RoundNode) {
    for(var i = 0; i < rounds.matchs.length; i++){
      var x = this.formBuilder.group({
        teamOne: new FormControl('',[Validators.required, Validators.minLength(2)]),
        teamTwo: new FormControl('',[Validators.required, Validators.minLength(2)]),
        teamOnePlayers : this.formBuilder.array([]),
        teamTwoPlayers : this.formBuilder.array([]),
      });
      this.getMatchs().push(x);
      for(var j = 0; j < this.teamFormat.length; j++){
          var playerTeamOne = this.formBuilder.group ({
            playerOneName : new FormControl('', Validators.required),
            playerSelected : new FormControl(false, Validators.requiredTrue),
            playerOneDetails : new FormControl(new PlayerDetails, Validators.required)

          });
          var playerTeamTwo =this.formBuilder.group ({
            playerTwoName : new FormControl('', Validators.required),
            playerSelected : new FormControl(false, Validators.requiredTrue),
            playerTwoDetails : new FormControl(new PlayerDetails, Validators.required)
          });
          var one = this.getTeamOnePlayers(i) as FormArray;
          one.push(playerTeamOne);
          var two = this.getTeamTwoPlayers(i) as FormArray;
          two.push(playerTeamTwo);
      }
    }
  }

  async retrievePlayers() { 
      // this.playerList = this.playerService.getAllPlayers()
      // this.playerList?.then((value : PlayerDetails[]) => 
      //   this.players = value)
      //   .catch((err) => this.players = []);
  }

  saveT1Player(player : PlayerDetails, teamIndex : number, playerIndex : number) {
    this.players = this.players.filter(x => player != x);
    var form = this.getTeamOnePlayers(teamIndex);
    form.at(playerIndex).get('playerOneName')?.setValue(player.playerName);
    form.at(playerIndex).get('playerOneName')?.disable();
    form.at(playerIndex).get('playerSelected')?.setValue(true);
    form.at(playerIndex).get('playerOneDetails')?.setValue(player);
  }

  deleteT1Player(teamIndex : number, playerIndex : number){
    var form = this.getTeamOnePlayers(teamIndex);
    var player = form.at(playerIndex).get('playerOneDetails')?.value;
    form.at(playerIndex).get('playerOneName')?.enable();
    form.at(playerIndex).get('playerOneName')?.setValue('');
    form.at(playerIndex).get('playerOneDetails')?.setValue(PlayerDetails);
    form.at(playerIndex).get('playerSelected')?.setValue(false);
    this.players.push(player);
  }

  saveT2Player(player : PlayerDetails, teamIndex : number, playerIndex : number) {
    this.players = this.players.filter(x => player != x);
    var form = this.getTeamTwoPlayers(teamIndex);
    form.at(playerIndex).get('playerTwoName')?.setValue(player.playerName);
    form.at(playerIndex).get('playerTwoName')?.disable();
    form.at(playerIndex).get('playerSelected')?.setValue(true);
    form.at(playerIndex).get('playerTwoDetails')?.setValue(player);
  }

  deleteT2Player(teamIndex : number, playerIndex : number){
    var form = this.getTeamTwoPlayers(teamIndex);
    var player = form.at(playerIndex).get('playerTwoDetails')?.value;
    form.at(playerIndex).get('playerTwoName')?.enable();
    form.at(playerIndex).get('playerTwoName')?.setValue('');
    form.at(playerIndex).get('playerTwoDetails')?.setValue(PlayerDetails);
    form.at(playerIndex).get('playerSelected')?.setValue(false);
    this.players.push(player);
  }

  playerFilter(playerNameInput : string) : PlayerDetails[]{
    var filterValue = playerNameInput.toLocaleLowerCase();
    return this.players.filter(option => option.playerName?.toLocaleLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.router.navigate(['/tournaments/create']);
  }

  submitNewTournament(): void {
    if(this.roundOneForm.valid){
      this.addInfoToTournament(this.roundOneForm);
      this.sharedTournamentService.setNewTournament(this.editTournament);
      this.router.navigate(['tournament/viewedit']);
    }
  }

  addInfoToTournament(roundForm : FormGroup){
    var matchArray = this.editTournament.rounds[0].matchs as MatchNode[];
    for(var i = 0; i < matchArray.length; i++){
      var matchArrayForm = roundForm.controls['matchs'] as FormArray;
      var matchForm = matchArrayForm.at(i) as FormControl;
      var tournyMatch = matchArray[i] as MatchNode;
      tournyMatch.teamOneName = matchForm.get('teamOne')?.value;
      tournyMatch.teamTwoName = matchForm.get('teamTwo')?.value;
      var playerOneArray = matchForm.get('teamOnePlayers') as FormArray;
      var playerTwoArray = matchForm.get('teamTwoPlayers') as FormArray;
      for(var x = 0; x < this.teamFormat.length; x++){
        tournyMatch.teamOne?.push(playerOneArray.at(x).get('playerOneDetails')!.value);
        tournyMatch.teamOne?.push(playerTwoArray.at(x).get('playerTwoDetails')!.value);
      }
    }
  }
}
