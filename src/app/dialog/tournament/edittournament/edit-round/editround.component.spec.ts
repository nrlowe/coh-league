import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroundComponent } from './editround.component';

describe('EditroundComponent', () => {
  let component: EditroundComponent;
  let fixture: ComponentFixture<EditroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
