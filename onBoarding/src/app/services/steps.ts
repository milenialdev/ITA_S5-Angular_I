import { Injectable } from '@angular/core';
import { IStep } from '../models/istep.interface';

@Injectable({
  providedIn: 'root'
})
export class Steps {
  getSteps(): IStep[] {
    return [];
  };
}
