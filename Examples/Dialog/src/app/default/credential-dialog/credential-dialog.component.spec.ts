import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialDialogComponent } from './credential-dialog.component';

describe('CredentialDialogComponent', () => {
  let component: CredentialDialogComponent;
  let fixture: ComponentFixture<CredentialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
