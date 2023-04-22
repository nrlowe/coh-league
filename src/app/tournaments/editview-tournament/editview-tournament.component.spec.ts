import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditviewTournamentComponent } from './editview-tournament.component';

describe('EditviewTournamentComponent', () => {
  let component: EditviewTournamentComponent;
  let fixture: ComponentFixture<EditviewTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditviewTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditviewTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
