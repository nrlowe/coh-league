import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
//only allow single elim currently
//live / upcoming
// then signups? 
//past?
  ngOnInit(): void {}
  ngOnDestroy(){}
}
