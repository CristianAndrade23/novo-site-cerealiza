import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConhecaComponent } from './conheca.component';

describe('ConhecaComponent', () => {
  let component: ConhecaComponent;
  let fixture: ComponentFixture<ConhecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConhecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConhecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
