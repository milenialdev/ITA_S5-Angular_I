import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Steps } from './steps';

describe('Steps', () => {
  let service: Steps;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Steps);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array with specific length', () => {
    const data = service.getSteps();
    expect(data.length).toBe(3);
  });

  it('should have correct structure', () => {
    const data = service.getSteps();
    expect(data[0].bgcolor).toBeDefined();
    expect(data[0].img).toBeDefined();
    expect(data[0].title).toBeDefined();
    expect(data[0].description).toBeDefined();
    expect(typeof data[0].bgcolor).toBe('string');
    expect(typeof data[0].img).toBe('string');
    expect(typeof data[0].title).toBe('string');
    expect(typeof data[0].description).toBe('string');
  });

  it('should have correct bgcolor for first step', () => {
    const data = service.getSteps();
    expect(data[0].bgcolor).toBe('#4ca2a8');
  });
});