import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowsContainersComponent } from './windows-containers.component';

describe('WindowsContainersComponent', () => {
  let component: WindowsContainersComponent;
  let fixture: ComponentFixture<WindowsContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowsContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowsContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
