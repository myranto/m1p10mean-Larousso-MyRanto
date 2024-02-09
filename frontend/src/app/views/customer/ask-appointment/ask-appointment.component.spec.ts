import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAppointmentComponent } from './ask-appointment.component';

describe('AskAppointmentComponent', () => {
  let component: AskAppointmentComponent;
  let fixture: ComponentFixture<AskAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
