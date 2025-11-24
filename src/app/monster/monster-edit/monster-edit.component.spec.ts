import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterEditComponent } from './monster-edit.component';

describe('MonsterEditComponent', () => {
  let component: MonsterEditComponent;
  let fixture: ComponentFixture<MonsterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
