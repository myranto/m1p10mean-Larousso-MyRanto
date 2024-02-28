import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentFormComponent } from './spent-form.component';

describe('SpentFormComponent', () => {
  let component: SpentFormComponent;
  let fixture: ComponentFixture<SpentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
