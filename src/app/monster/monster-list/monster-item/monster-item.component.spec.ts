import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterItemComponent } from './monster-item.component';

describe('MonsterItemComponent', () => {
  let component: MonsterItemComponent;
  let fixture: ComponentFixture<MonsterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
