import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRoundOneComponent } from './set-round-one.component';

describe('SetRoundOneComponent', () => {
  let component: SetRoundOneComponent;
  let fixture: ComponentFixture<SetRoundOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRoundOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetRoundOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
