import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escena } from './escena';

describe('Escena', () => {
  let component: Escena;
  let fixture: ComponentFixture<Escena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Escena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
