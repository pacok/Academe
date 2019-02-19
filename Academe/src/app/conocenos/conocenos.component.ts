import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.scss']
})
export class ConocenosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  contacto() {
swal.mixin({
  input: 'text',
  confirmButtonText: 'Siguiente&rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2']
}).queue([
  {
    title: 'Asunto:',
    text: 'Indicanos cual es tu consulta'
  },
  {
    title: 'Mensaje:'
  },
]).then((result) => {
  if (result.value) {
    swal.fire({
      title: 'Confirmacion de envio',
      html:
        'Tu mensaje: <pre><code>' +
          JSON.stringify(result.value) +
        '</code></pre>',
      confirmButtonText: 'Enviar'
    });
  }
});
  }

}
