import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToQuestionComponent } from './add-to-question.component';

describe('AddToQuestionComponent', () => {
  let component: AddToQuestionComponent;
  let fixture: ComponentFixture<AddToQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
