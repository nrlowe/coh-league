import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  constructor(private router : Router){

  }
  goToCreate(){
    this.router.navigate(['/tournaments/create']);
  }

  goToUpdate(){
    
  }

  goToDelete(){
    
  }
}
