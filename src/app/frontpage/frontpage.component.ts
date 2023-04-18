import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerRank } from '../models/playerrank';
import { Tournament } from '../models/tournament';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  //get active tournaments / upcoming tournaments - get player rankings
  //show live twitch streams?

  @Input() pageLiveTournaments : any[] = [];
  @Input() pageUpcomingTournaments : any[] = [];
  pagePlayerRank : any[] = [];

  @Output() changeRankPage = new EventEmitter<any>(true);

  liveTournaments : Tournament[] = []; 
  rankList : PlayerRank[] = [];
  upComingTournaments : Tournament[] = [];

  @Input() liveTournamentPage = 1;
  @Input() upcomingTournamentPage = 1;
  @Input() rankingPage = 1;
  @Input() tournamentPageSize = 5;
  @Input() rankPageSize = 10;

  pager: any = {};

//NEED USER SESSIONS FOR PERSISTENCE
  ngOnInit(): void {
    for(var i = 0; i < 5; i++){
      //this.liveTournaments.push(new Tournament(i, "Test Tournament " + i, "CoH 2",  new Date().toDateString()));
    }

    for(var i = 0; i < 39; i++){
      this.rankList.push(new PlayerRank(i, "Test Name " + i, i * 2));
    }

    this.setRankPage(this.rankingPage);

    this.pageLiveTournaments = this.liveTournaments;
  }

  setRankPage(page : number){
    // // get new pager object for specified page
    // this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // // get new page of items from items array
    // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // // call change page function in parent component
    // this.changePage.emit(pageOfItems);
  }



}
