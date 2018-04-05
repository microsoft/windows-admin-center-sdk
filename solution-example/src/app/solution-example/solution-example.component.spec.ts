import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionExampleComponent } from './solution-example.component';

describe('SolutionExampleComponent', () => {
  let component: SolutionExampleComponent;
  let fixture: ComponentFixture<SolutionExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
