import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reporte-subscripcion',
  templateUrl: './reporte-subscripcion.component.html',
  styleUrls: ['./reporte-subscripcion.component.scss']
})
export class ReporteSubscripcionComponent implements OnInit {
  items: any;
  alumnos = [ ];
  alumnosNuevo = [];
  items3: any [];
  ocultar = false;

  Subscripciones = [
    { nombre: '',
      cursos: [{
        curso: ''
      }]
    }
  ];

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getSubscripciones()
    .subscribe(result => {
      this.items = result;
      for (const item of this.items) {
         this.alumnos.push(item.payload.doc.data().alumno);
         this.removeDuplicateUsingFilter(this.alumnos);
      }
    });
  }
  removeDuplicateUsingFilter(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (this.alumnosNuevo.indexOf(arr[i]) === -1) {
          this.alumnosNuevo.push(arr[i]);
        }
    }
    return this.alumnosNuevo;
}

rellenarArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    this.firebaseService.getSubscripcionesPorUsuario(arr[i]).subscribe(result => {
      this.items3 = result;
      this.Subscripciones.push({ nombre : arr[i], cursos : this.items3 });
    });
  }
  this.Subscripciones.shift();
}

verTabla() {
  this.rellenarArray(this.alumnosNuevo);
  this.ocultar = !this.ocultar;
}

public generarPDF() {
  const data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  const imgWidth = 208;
  const pageHeight = 295;
  const allowTaint = true;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  const heightLeft = imgHeight;

  const contentDataURL = canvas.toDataURL('image/png');
  const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  const position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  pdf.save('AlumnosSubscripciones.pdf'); // Generated PDF
  });
  }

}
