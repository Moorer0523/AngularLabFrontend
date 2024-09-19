import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerQuestionComponent } from './container-question.component';

describe('ContainerQuestionComponent', () => {
  let component: ContainerQuestionComponent;
  let fixture: ComponentFixture<ContainerQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
