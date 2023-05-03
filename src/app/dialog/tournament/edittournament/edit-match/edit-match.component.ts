import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatchNode } from 'src/app/models/matchnode';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatchNode,
  ) {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
