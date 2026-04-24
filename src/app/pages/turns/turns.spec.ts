import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Turns } from './turns';

describe('Turns', () => {
  let component: Turns;
  let fixture: ComponentFixture<Turns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Turns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Turns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
