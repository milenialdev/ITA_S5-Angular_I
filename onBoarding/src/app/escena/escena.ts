import { Component, input, signal } from '@angular/core';
import { IStep } from '../models/istep.interface';

@Component({
  selector: 'app-escena',
  imports: [],
  templateUrl: './escena.html',
  styleUrl: './escena.css'
})
export class Escena {
  steps = input.required<IStep[]>();

  currentStep = signal(0);

  directionAnimation = signal<'left' | 'right'>('right');
  animationTrigger = signal(0);

  nextStep(){
    this.directionAnimation.set('right')
    this.currentStep.update(value => Math.min(value + 1, this.steps().length - 1));
  }

  previousStep(){
    this.directionAnimation.set('left')
    this.currentStep.update(value => Math.max(value - 1, 0));
  }

  goToStep(index: number){
    if(index !== this.currentStep()){
      this.directionAnimation.set(index > this.currentStep() ? 'right' : 'left');
      this.currentStep.set(index);
    }
  }
  getAnimationClass(): string {
    return this.directionAnimation() === 'right' ? 'slide-in-right' : 'slide-in-left';
  }
}
