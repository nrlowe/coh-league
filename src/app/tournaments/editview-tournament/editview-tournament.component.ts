import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';
import { EditRoundComponent } from 'src/app/dialog/tournament/edittournament/edit-round/editround.component';
import { MatchNode } from 'src/app/models/matchnode';
import { PlayerDetails } from 'src/app/models/playerdetails';
import { RoundNode } from 'src/app/models/roundnode';
import { TournamentDetails } from 'src/app/models/tournamentdetails';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { EditTournamentService } from 'src/app/services/edit-tournament.service';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';

@Component({
  selector: 'app-editview-tournament',
  templateUrl: './editview-tournament.component.html',
  styleUrls: ['./editview-tournament.component.css']
})
export class EditviewTournamentComponent {
  newTournament : any;
  image : boolean = true;
  teamview : boolean = false;
  playerview : PlayerDetails[] = [];
  ngOnInit(): void {
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.newTournament = data;
    });
    var tour = new TournamentDetails("TEST", 3, 5, 16, "CoH2", true);
    this.newTournament = this.editTournamentService.createNewTournament(tour);
  }
  
  constructor(private sharedTournamentService : SharedTournamentService, public dialog : MatDialog,
    private editTournamentService : EditTournamentService){
  }

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

  saveTournament(tournamentTree : TournamentTree){
    
  }

  viewteam(teamvalues : PlayerDetails[]){
    if (!this.teamview) {
      this.teamview = true;
      this.playerview = teamvalues;
    } else {
      //highlight open teamview
    }

  }

  closeteamview(){
    this.teamview = false;
    this.playerview = [];
  }
}
