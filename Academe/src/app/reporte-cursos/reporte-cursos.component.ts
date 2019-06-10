import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-reporte-cursos',
  templateUrl: './reporte-cursos.component.html',
  styleUrls: ['./reporte-cursos.component.scss']
})
export class ReporteCursosComponent implements OnInit {

  items: any;
  name_filtered_items: Array<any>;

  constructor(
    private route: ActivatedRoute,
    public firebaseService: FirebaseService,
  ) {
   }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.firebaseService.getCursos()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
    });
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
  pdf.save('CursosDisponibles.pdf'); // Generated PDF
  });
  }

}
