import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterStartComponent } from './monster-start.component';

describe('MonsterStartComponent', () => {
  let component: MonsterStartComponent;
  let fixture: ComponentFixture<MonsterStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
