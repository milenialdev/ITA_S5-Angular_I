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

  nextStep(){
    this.currentStep.update(value => Math.min(value + 1, this.steps().length - 1));
  }

  previousStep(){
    this.currentStep.update(value => Math.max(value - 1, 0));
  }

  goToStep(index: number){
    this.currentStep.set(index)
  }
}
