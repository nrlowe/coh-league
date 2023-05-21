import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ToolsComponent } from './tools/tools.component';
import { RankingsComponent } from './rankings/rankings.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { CreateTournament } from './tournaments/createtournament/createtournament.component';
import { ViewtournamentComponent } from './tournaments/viewtournament/viewtournament.component';
import { EdittournamentComponent } from './tournaments/edittournament/edittournament.component';
import { EditviewTournamentComponent } from './tournaments/editview-tournament/editview-tournament.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  //if loading have home be displayed
  //todo clean up / add children
  { path: '',   redirectTo: 'frontpage', pathMatch: 'full' },
  { path: 'frontpage', component: FrontpageComponent},
  { path: 'tournaments', component: TournamentsComponent},
  { path: 'tournaments/create', component: CreateTournament},
  { path: 'tournament/viewedit', component: EditviewTournamentComponent},
  { path: 'rankings', component: RankingsComponent},
  { path: 'tools', component: ToolsComponent},
  { path: 'tournament/viewtournament', component: ViewtournamentComponent},
  { path: 'tournament/viewtournament/:tournamentId', component: ViewtournamentComponent},
  { path: 'tournament/edittournament', component: EdittournamentComponent},
  { path: 'login', component: LoginComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }