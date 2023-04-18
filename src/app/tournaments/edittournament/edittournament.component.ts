import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-edittournament',
  templateUrl: './edittournament.component.html',
  styleUrls: ['./edittournament.component.css']
})
export class EdittournamentComponent {
  editTournament? : any;
  teamFormat? : any;
  playerList? : Promise<PlayerDetails[]>;
  public players : PlayerDetails[] = [];
  filterPlayers? : PlayerDetails[] = [];
  @Input()
  text: string = '';
  constructor(private sharedTournamentService : SharedTournamentService, 
    private editTournamentService : EditTournamentService, 
    private playerService : PlayerService,
    private router : Router,  public dialog : MatDialog){

  }

  async ngOnInit(){
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.editTournament = data;
    });
    await this.retrievePlayers();
    var tournamentDetails = new TournamentDetails("Test Tournament", 2, 3, 16, "CoH2", true);
    var x = this.editTournamentService.createNewTournament(tournamentDetails);
    this.editTournament = x;
    this.teamFormat = Array(x.teamSize).fill(0).map((x,i)=>i);  
    console.log(this.playerList);
  }

  async retrievePlayers() {     
      this.playerList = this.playerService.getAll2()
      this.playerList?.then((value : PlayerDetails[]) => 
        this.players = value)
        .catch((err) => this.players = []);
  }

  onKeyUp(text : string) {
    this.filterPlayers = this.players.filter(x => {
      return x.name?.toLocaleLowerCase().includes(text);
    })
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
    this.router.navigate(['/viewtournament']);
  }
}

//get tournament, get players(for specified game)
//option to create new player/update player(if current steam name is wrong) check via steam id