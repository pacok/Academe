import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallesCursoPage } from './detalles-curso';

@NgModule({
  declarations: [
    DetallesCursoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallesCursoPage),
  ],
})
export class DetallesCursoPageModule {}
