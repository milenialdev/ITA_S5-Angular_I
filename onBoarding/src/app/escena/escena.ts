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
  showContent = signal(true);

  nextStep(){
    this.directionAnimation.set('right')
    this.showContent.set(false)
    setTimeout(() =>{
    this.currentStep.update(value => Math.min(value + 1, this.steps().length - 1))
    this.showContent.set(true)
    }, 50);
  }

  previousStep(){
    this.directionAnimation.set('left')
    this.showContent.set(false)
    setTimeout(() => {
      this.currentStep.update(value => Math.max(value - 1, 0))
      this.showContent.set(true)
    }, 50);
  }

  goToStep(index: number){
    if(index !== this.currentStep()){
      this.directionAnimation.set(index > this.currentStep() ? 'right' : 'left');
      this.showContent.set(false);
      setTimeout(() => {
        this.currentStep.set(index);
        this.showContent.set(true);
      }, 50);
    }
  }
  getAnimationClass(): string {
    return this.directionAnimation() === 'right' ? 'slide-in-right' : 'slide-in-left';
  }
}
