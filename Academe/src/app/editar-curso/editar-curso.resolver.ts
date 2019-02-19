import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
// esta clase la utilizo para mas componentes: cuidadito
@Injectable()
export class EditarCursoResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const cursoId = route.paramMap.get('id');
      this.firebaseService.getCurso(cursoId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
