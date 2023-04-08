import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit{
  newTournament : any;
  ngOnInit(): void {
    this.sharedTournamentService.getNewTournamentObject().subscribe(data => {
      this.newTournament = data;
    });
    console.log(this.newTournament.rounds);
    
  }
  
  constructor(private sharedTournamentService : SharedTournamentService){
    
  }

}
