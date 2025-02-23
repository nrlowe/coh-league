import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetournamentComponent } from './createtournament.component';

describe('CreatetournamentComponent', () => {
  let component: CreatetournamentComponent;
  let fixture: ComponentFixture<CreatetournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
