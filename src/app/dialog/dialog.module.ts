import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchComponent } from './tournament/edittournament/edit-match/edit-match.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CreatetournamentComponent } from './tournament/createtournament/createtournament.component';
import { EditRoundComponent } from './tournament/edittournament/edit-round/editround.component';
import { SetRoundOneComponent } from './tournament/edittournament/set-round-one/set-round-one.component';



@NgModule({
  declarations: [
    EditMatchComponent,
    CreatetournamentComponent,
    EditRoundComponent,
    SetRoundOneComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [EditMatchComponent, CreatetournamentComponent, EditRoundComponent]
})
export class DialogModule { }