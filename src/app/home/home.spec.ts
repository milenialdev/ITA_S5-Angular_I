import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data signal that returns an array', () => {
    expect(Array.isArray(component.data())).toBe(true);
  });

  it('should have 3 steps in data', () => {
    expect(component.data().length).toBe(3);
  });

  it('should have correct structure in data steps', () => {
    const steps = component.data();
    
    steps.forEach(step => {
      expect(step.title).toBeDefined();
      expect(step.description).toBeDefined();
      expect(step.img).toBeDefined();
      expect(step.bgcolor).toBeDefined();
    });
  });
});