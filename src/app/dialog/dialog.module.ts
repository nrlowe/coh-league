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
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { AddupdateplayerComponent } from './player/addupdateplayer/addupdateplayer.component';
import { DeleteplayerComponent } from './player/deleteplayer/deleteplayer.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 



@NgModule({
  declarations: [
    EditMatchComponent,
    CreatetournamentComponent,
    EditRoundComponent,
    SetRoundOneComponent,
    AddupdateplayerComponent,
    DeleteplayerComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  exports: [EditMatchComponent, CreatetournamentComponent, 
    EditRoundComponent,AddupdateplayerComponent, DeleteplayerComponent]
})
export class DialogModule { }