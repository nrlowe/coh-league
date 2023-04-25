import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerRank } from '../models/playerrank';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { PlayerService } from '../services/player-service';
import { Observer } from 'rxjs';
import { PlayerDetails } from '../models/playerdetails';
import { TournamentDto } from '../models/dto/tournamentdto';

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
  rankList : PlayerDetails[] = [];
  rankObserver? : Promise<PlayerDetails[]>;
  tournamentPromise? : Promise<TournamentDto[]>;
  tournamentDtoList : TournamentDto[] = [];
  upComingTournaments : Tournament[] = [];

  @Input() liveTournamentPage = 1;
  @Input() upcomingTournamentPage = 1;
  @Input() rankingPage = 1;
  @Input() tournamentPageSize = 5;
  @Input() rankPageSize = 10;

  pager: any = {};


//TODOS:::::::
//make dates mandatory, date selection(only allow picks between start and end?)
//convert string to image on editview load /save image to a global value in editview for quick access
//allow user to select team as 'OPEN' or 'BYE' 
// user session
// proceed button error animation
  constructor(private tournamentService : TournamentService, private playerService : PlayerService) {

  }
  ngOnInit() {
    //check login (or should this occur in app.component?)
    this.getAllPLayers();
    this.retrieveTournaments();
    //this.retrievePlayers2();
    //convert dto to tournamenttree
  }

  private async getAllPLayers(){
    await this.retrievePlayers();
    this.rankList.sort((a,b) => b.points! - a.points!);
  }

  private async retrievePlayers(){
    this.rankObserver = this.playerService.getAllPlayers();
    await this.rankObserver;
    await this.rankObserver?.then((value : PlayerDetails[]) => 
    this.rankList = value)
    .catch((err) => this.rankList = []);
  }

  private async retrieveTournaments(){
    this.tournamentPromise = this.tournamentService.getAllTournaments();
    this.tournamentPromise?.then((value : TournamentDto[]) =>
    this.tournamentDtoList = value).catch((err) => this.tournamentDtoList = []);
  }

  splitTournaments(){

  }

  orderTournaments(){

  }

  orderRanks(){

  }

  setRankPage(page : number){
    // // get new pager object for specified page
    // this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // // get new page of items from items array
    // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // // call change page function in parent component
    // this.changePage.emit(pageOfItems);
  }

  ngOnDestroy(){
    this.rankList = [];
  }



}
