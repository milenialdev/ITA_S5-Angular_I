import { Injectable } from '@angular/core';
import { IStep } from '../models/istep.interface';

@Injectable({
  providedIn: 'root'
})

export class Steps {
  getSteps(): IStep[] {
    return [
      {
        title: `<h3>Dedica moltes hores</h3>`,
        description: `Un mínim de 30 hores a la setmana. Si no en tens prou, hauràs de dedicar-li més hores. Al principi sembla impossible, però notaràs una millora ràpidament. <br><br>`,
        img: `/assets/time_management.svg`, 
        bgcolor: `#4ca2a8`
      },
      {
        title: `<h3>Programa projectes propis:</h3> ` ,
        description: `Més val 10 hores treballant en projectes propis, que 10 hores mirant tutorials. La motivació i la implicació en el projecte ajudarà a accelerar el teu aprenentatge. <br><br>`,
        img: `/assets/programming.svg`,
        bgcolor: `#d2d5d9`
      },
      {
        title: `<h3>Procura descansar:</h3>`,
        description: `Descansar bé i desconnectar són vitals. D'aquesta manera reduiràs l'estrès i l'ansietat. Milloraràs la teva concentració i consolidaràs el teu aprenentatge.`,
        img: `/assets/meditation.svg`,
        bgcolor: `#ffd167`
      },
      
    ];
  };
}
