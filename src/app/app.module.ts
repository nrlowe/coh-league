import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from './dialog/dialog.module';
import { MatSelectModule } from '@angular/material/select';
import { EdittournamentComponent } from './tournaments/edittournament/edittournament.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { EditviewTournamentComponent } from './tournaments/editview-tournament/editview-tournament.component';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login.component';


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
    ViewtournamentComponent,
    EdittournamentComponent,
    EditviewTournamentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DialogModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
