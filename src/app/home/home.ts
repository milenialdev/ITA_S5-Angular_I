import { Component, inject, signal } from '@angular/core';
import { Steps } from '../services/steps'
import { Escena } from '../escena/escena';

@Component({
  selector: 'app-home',
  imports: [ Escena ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private steps = inject(Steps);

  data = signal(this.steps.getSteps());
}
