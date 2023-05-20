import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { PlayerRank } from '../models/playerrank';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { PlayerService } from '../services/player-service';
import { Observer } from 'rxjs';
import { PlayerDetails } from '../models/playerdetails';
import { TournamentDto } from '../models/dto/tournamentdto';
import { Router } from '@angular/router';
import { SharedTournamentService } from '../services/shared-tournament.service';
import { JsonService } from '../services/json-service';

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

  liveTournaments : TournamentDto[] = []; 
  rankList : PlayerDetails[] = [];
  rankObserver? : Observer<PlayerDetails[]>;
  tournamentPromise? : Promise<TournamentDto[]>;
  tournamentDtoList : TournamentDto[] = [];
  upComingTournaments : TournamentDto[] = [];

  @Input() liveTournamentPage = 1;
  @Input() upcomingTournamentPage = 1;
  @Input() rankingPage = 1;
  @Input() tournamentPageSize = 5;
  @Input() rankPageSize = 10;

  pager: any = {};


//TODOS:::::::
//make dates mandatory, date selection(only allow picks between start and end?) on round edit
//when creating new player - make sure steamid is unique, have game picker (coh2 or coh3)
//toasts for confirmation on completed actions (created new player success, etc etc)
//convert string to image on editview load /save image to a global value in editview for quick access
//allow user to select team as 'OPEN' or 'BYE' 
// user session
// proceed button error animation
  constructor(private tournamentService : TournamentService, private playerService : PlayerService, private router : Router,
    private sharedService : SharedTournamentService, private jsonService : JsonService) {

  }
  ngOnInit() {
    //check login (or should this occur in app.component?)
    this.getAllPLayers();
    this.retrieveTournaments();
    this.rankList.sort((a,b) => b.points! - a.points!);
    //this.retrievePlayers2();
    //convert dto to tournamenttree
  }

  private getAllPLayers(){
    this.retrievePlayers();
    this.rankList.sort((a,b) => b.points! - a.points!);
  }

  private retrievePlayers(){
    this.playerService.getAllPlayers().forEach(doc => {
      doc.forEach(player => {
          var x = new PlayerDetails;
          x.playerName = player.playerName;
          x.steamId = player.steamId;
          x.points = player.points;
          this.rankList.push(x);
      })
    }).catch((err)=>console.log("ERROR::::: " + err));
  }

  private retrieveTournaments(){
    this.tournamentService.getAllTournaments().forEach(doc => {
      doc.forEach(tourny => {
        var t = new TournamentDto(tourny.title!, tourny.teamSize!, 
          tourny.playerNumber!, tourny.gameVersion!, tourny.open, tourny.hasImage);
          t.matchTree = tourny.matchTree;
          t.rounds = tourny.rounds;
          t.startDate = tourny.startDate;
          t.endDate = tourny.endDate;
          t.liveStatus = this.checkLiveStatus(t.startDate!, t.endDate!);
          t.creatorKey = tourny.documentId;
          
        this.liveTournaments.push(t);
        this.tournamentDtoList.push(t);
      })
    }).catch((err)=>console.log("ERROR::::: " + err));
  }

  checkLiveStatus(startDate : string, endDate : string) : boolean {
    const start = new Date(startDate);
    const end = new Date(endDate)
    const today = new Date();
    if(today >= start && today <= end) {
      return true;
    } else {
      return false;
    }
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

  viewTournament(tournamentDto : TournamentDto){
    var tournamentTree = this.jsonService.convertTournamentDtoToTree(tournamentDto);
    this.sharedService.setViewTournament(tournamentTree);
    this.router.navigate(['/tournament/viewtournament']);
  }

  ngOnDestroy() : void{
  }



}
