import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Escena } from './escena';
import { ComponentRef } from '@angular/core';

describe('Escena', () => {
  let component: Escena;
  let fixture: ComponentFixture<Escena>;
  let componentRef: ComponentRef<Escena>;

  const mockSteps = [
    {
      title: '<h3>Step 1</h3>',
      description: 'Description 1',
      img: '/test1.svg',
      bgcolor: '#000000'
    },
    {
      title: '<h3>Step 2</h3>',
      description: 'Description 2',
      img: '/test2.svg',
      bgcolor: '#111111'
    },
    {
      title: '<h3>Step 3</h3>',
      description: 'Description 3',
      img: '/test3.svg',
      bgcolor: '#222222'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escena],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Escena);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    
    componentRef.setInput('steps', mockSteps);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 0', () => {
    expect(component.currentStep()).toBe(0);
  });

  it('should increment currentStep when calling nextStep', async () => {
    component.nextStep();
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.currentStep()).toBe(1);
  });

  it('should decrement currentStep when calling previousStep', async () => {
    component.currentStep.set(1);
    component.previousStep();
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.currentStep()).toBe(0);
  });

  it('should not go below 0 when calling previousStep at first step', async () => {
    component.currentStep.set(0);
    component.previousStep();
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.currentStep()).toBe(0);
  });

  it('should not go above last step when calling nextStep at last step', async () => {
    component.currentStep.set(2);
    component.nextStep();
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.currentStep()).toBe(2);
  });

  it('should go to specific step when calling goToStep', async () => {
    component.goToStep(2);
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.currentStep()).toBe(2);
  });

  it('should set animation direction to right when going forward', async () => {
    component.nextStep();
    expect(component.directionAnimation()).toBe('right');
    await new Promise(resolve => setTimeout(resolve, 60));
  });

  it('should set animation direction to left when going backward', async () => {
    component.currentStep.set(1);
    component.previousStep();
    expect(component.directionAnimation()).toBe('left');
    await new Promise(resolve => setTimeout(resolve, 60));
  });
});