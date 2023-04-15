import { Component, OnInit, Input, Inject } from '@angular/core';
import { RoundDetails } from 'src/app/models/rounddetails';
import { RoundNode } from 'src/app/models/roundnode';
import { MatchNode } from 'src/app/models/matchnode';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTree } from 'src/app/models/tournamenttree';
import { SharedTournamentService } from 'src/app/services/shared-tournament.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPseudoCheckbox } from '@angular/material/core';
import { EditMatchComponent } from 'src/app/dialog/tournament/edittournament/edit-match/edit-match.component';

@Component({
  selector: 'app-edit-round',
  templateUrl: './editround.component.html',
  styleUrls: ['./editround.component.css']
})
export class EditRoundComponent {
  constructor(
    public dialogRef: MatDialogRef<EditRoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoundNode,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
