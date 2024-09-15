import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { QuizzesComponent } from './quizzes.component';

import { QuizzFacade } from '../../quizz-data-access/quizz.facade';
import { Observable, of } from 'rxjs';
import { MappedQuizzQuestions } from '../../quizz-data-access/quizz.models';

const QUIZZES = [
  {
    id: 1,
    category: 'Test Category',
    questions: [
      {
        category: 'Test Category 1',
        difficulty: 'Easy',
        type: 'Multi',
        question: 'Test Question 1',
        correct_answer: 'A',
        incorrect_answers: ['B', 'C', 'D'],
        allAnswers: ['A', 'B', 'C', 'D'],
      },
    ],
  },
];

class MockQuizzFacade {
  setResult = jest.fn();

  getQuizzes$(): Observable<MappedQuizzQuestions[]> {
    return of(QUIZZES);
  }

  error$ = of(null);
}

@Component({
  selector: 'app-test-quizzes',
  template: '',
})
export class TestQuizzesComponentStub extends QuizzesComponent {}

describe('QuizzesComponent', () => {
  let fixture: ComponentFixture<TestQuizzesComponentStub>;
  let component: TestQuizzesComponentStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestQuizzesComponentStub],
      providers: [
        Router,
        {
          provide: QuizzFacade,
          useClass: MockQuizzFacade,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<TestQuizzesComponentStub>(
      TestQuizzesComponentStub
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create QuizzComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should remove spinner', () => {
    component.ngAfterContentInit();
    expect(component.isSpinerVisible).toBeFalsy();
  });
});
