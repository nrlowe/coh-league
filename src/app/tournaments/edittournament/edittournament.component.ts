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
    var tournamentDetails = new TournamentDetails("Test Tournament", 2, 3, 4, "CoH2", true);
    var x = this.editTournamentService.createNewTournament(tournamentDetails);
    this.editTournament = x;
    this.teamFormat = Array(x.teamSize).fill(0).map((x,i)=>i);
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

  // async retrievePlayers() {     
  //     this.playerList = this.playerService.getAll2()
  //     this.playerList?.then((value : PlayerDetails[]) => 
  //       this.players = value)
  //       .catch((err) => this.players = []);
  // }


  retrievePlayers(){
    this.createAndAdd("xbubalo", 4, "fpsdiojfvpoidsj");
    this.createAndAdd("pob", 17, "dsgvsdgvsd");
    this.createAndAdd("farlion", 24, "dsgvdsvvdsv");
    this.createAndAdd("fartlion", 39, "sdbgs");
    this.createAndAdd("bob", 1, "sdbdsbsbs");
    this.createAndAdd("joe", 98, "sdbsdbsdbsdb");
    this.createAndAdd("sarah", 10, "sdbdsbxdbxc");
    this.createAndAdd("stan", 90, "sdbsdbxcbvxf");
    this.createAndAdd("papa", 42, "xcbxcbsdf");
    this.createAndAdd("mama", 46, "xcbxcbsfb");
    this.createAndAdd("God", 1000, "xcbxcbxcb");
    this.createAndAdd("Dog", 9, "vdfbvddbf");
    this.createAndAdd("120498343", 2, "dfhrtjtjnmrfhrtf");
    this.createAndAdd("Stanstan", 5, "sdfgdfhdfbdf");
    this.createAndAdd("Becca", 7, "dfhrtfhfghfghnfg");
  }
 

  createAndAdd(name : string, points : number, id : string){
    var player = new PlayerDetails();
    player.name = name;
    player.points = points;
    player.steamId = id;
    this.players.push(player);
  }

  saveT1Player(player : PlayerDetails, teamIndex : number, playerIndex : number) {
    this.players = this.players.filter(x => player != x);
    var form = this.getTeamOnePlayers(teamIndex);
    form.at(playerIndex).get('playerOneName')?.setValue(player.name);
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
    form.at(playerIndex).get('playerTwoName')?.setValue(player.name);
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
    console.log(playerNameInput);
    var filterValue = playerNameInput.toLocaleLowerCase();
    return this.players.filter(option => option.name?.toLocaleLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.router.navigate(['/tournaments/create']);
  }

  submitNewTournament(): void {
    if(this.roundOneForm.valid){
      this.addInfoToTournament(this.roundOneForm);
      this.sharedTournamentService.setNewTournament(this.editTournament);
      console.log(this.editTournament.rounds!.length);
    var roundArray = this.editTournament.rounds as RoundNode[];
    var matchArray = roundArray[0].matchs;
    console.log(matchArray.length);
    var matchNode = matchArray[0] as MatchNode;
    console.log(matchArray[0].teamOneName);
      this.router.navigate(['tournament/viewedit']);
    }
  }

  // teamOne: new FormControl('',[Validators.required, Validators.minLength(2)]),
  //       teamTwo: new FormControl('',[Validators.required, Validators.minLength(2)]),
  //       teamOnePlayers : this.formBuilder.array([]),
  //       teamTwoPlayers : this.formBuilder.array([]),
  //     });
  //     this.getMatchs().push(x);
  //     for(var j = 0; j < this.teamFormat.length; j++){
  //         var playerTeamOne = this.formBuilder.group ({
  //           playerOneName : new FormControl('', Validators.required),
  //           playerSelected : new FormControl(false, Validators.requiredTrue),
  //           playerOneDetails : new FormControl(new PlayerDetails, Validators.required)

  //         });
  //         var playerTeamTwo =this.formBuilder.group ({
  //           playerTwoName : new FormControl('', Validators.required),
  //           playerSelected : new FormControl(false, Validators.requiredTrue),
  //           playerTwoDetails : new FormControl(new PlayerDetails, Validators.required)
  //         });
  //         var one = this.getTeamOnePlayers(i) as FormArray;
  //         one.push(playerTeamOne);
  //         var two = this.getTeamTwoPlayers(i) as FormArray;
  //         two.push(playerTeamTwo);

  addInfoToTournament(roundForm : FormGroup){
    var matchArray = this.editTournament.rounds[0].matchs as MatchNode[];
    for(var i = 0; i < matchArray.length; i++){
      var matchArrayForm = roundForm.controls['matchs'] as FormArray;
      var matchForm = matchArrayForm.at(i) as FormControl;
      var tournyMatch = matchArray[i] as MatchNode;
      console.log( matchForm.get('teamOne')?.value);
      console.log(tournyMatch.teamOneName);
      tournyMatch.teamOneName = matchForm.get('teamOne')?.value;
      tournyMatch.teamTwoName = matchForm.get('teamTwo')?.value;
      console.log(tournyMatch.teamOneName);
      var playerOneArray = matchForm.get('teamOnePlayers') as FormArray;
      var playerTwoArray = matchForm.get('teamTwoPlayers') as FormArray;
      for(var x = 0; x < this.teamFormat.length; x++){
        tournyMatch.teamOne?.push(playerOneArray.at(x).get('playerOneDetails')!.value);
        tournyMatch.teamOne?.push(playerTwoArray.at(x).get('playerTwoDetails')!.value);
      }
    }
  }



  ///////////////////////////


  editDate(round : RoundNode){
    round.date = "March 2025";
    round.roundName = "Round 50";
  }

  openRoundEditDialog(roundNode : RoundNode){
    const dialogRef = this.dialog.open(EditRoundComponent, {
      data : roundNode,
    });

    dialogRef.afterClosed().subscribe(result => {
      roundNode = result;
    })
  }

  openEditMatchDialog(match : MatchNode) {
    const dialogRef = this.dialog.open(EditMatchComponent, {
      data : match,
    });

    dialogRef.afterClosed().subscribe(result => {
      match = result;
    })
  }


  proceedToView(tournamentTree : TournamentTree) {
    this.sharedTournamentService.setNewTournament(tournamentTree);
    console.log(tournamentTree.rounds!.length);
    var roundArray = tournamentTree.rounds as RoundNode[];
    var matchArray = roundArray[0].matchs;
    console.log(matchArray.length);
    var matchNode = matchArray[0] as MatchNode;
    console.log(matchNode.teamOne);
    this.router.navigate(['/viewtournament']);
  }
}


//get tournament, get players(for specified game)
//option to create new player/update player(if current steam name is wrong) check via steam id