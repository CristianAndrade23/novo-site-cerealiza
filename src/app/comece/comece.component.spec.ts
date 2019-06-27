import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeceComponent } from './comece.component';

describe('ComeceComponent', () => {
  let component: ComeceComponent;
  let fixture: ComponentFixture<ComeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
