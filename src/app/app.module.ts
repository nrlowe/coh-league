import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-router.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { UserComponent } from './user/user.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ToolsComponent } from './tools/tools.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTournament } from './tournaments/createtournament/createtournament.component';
import { ViewtournamentComponent } from './tournaments/viewtournament/viewtournament.component';


@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    UserComponent,
    RankingsComponent,
    ToolsComponent,
    NavbarComponent,
    FooterComponent,
    FrontpageComponent,
    CreateTournament,
    ViewtournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
