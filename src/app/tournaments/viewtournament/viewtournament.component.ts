import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';

@Component({
  selector: 'app-viewtournament',
  templateUrl: './viewtournament.component.html',
  styleUrls: ['./viewtournament.component.css']
})
export class ViewtournamentComponent implements OnInit{
  @Input() newTournament? : Tournament;
  ngOnInit(): void {
    
  }
  
  constructor(){
    
  }

}
