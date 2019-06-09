import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-temas-cursos',
  templateUrl: './temas-cursos.component.html',
  styleUrls: ['./temas-cursos.component.scss']
})
export class TemasCursosComponent implements OnInit {
  item: any;
  myForm: FormGroup;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  downloadURL: string;
  item3: any;
  items3: any;
  pathdefault: any;
  tema = false;
  material = null;
  private roles: string[];
  private authority: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    private _storage: AngularFireStorage,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.roles = this.tokenStorage.getAuthorities();
    this.roles.every(role => {
      if (role === 'ROL_ADMINISTRADOR') {
        this.authority = 'admin';
        return false;
      }
      this.authority = 'user';
      return true;
    });
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    });

    this.createForm();
    this.ContenidoDelCurso(this.item.nombre);
  }

  createForm() {
    this.myForm = this.fb.group({
      tema: new FormControl(' ', Validators.compose([Validators.required])),
      titulo: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  resetFields() {
    this.downloadURL = '';
    this.myForm = this.fb.group({
      tema: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required)
    });
  }

  save(model) {
    console.log(model.tema);

    if (this.comprobacion(model.tema) === true && this.material !== null) {
      swal.fire({
        title: 'Tema añadido',
        text: '',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          console.log('El tema no está');
          this.crearTema(model);
          console.log(this.item3);
          this.firebaseService.createContenido(this.item3, this.downloadURL);
        }
      });
    } else {
      swal.fire({
        title: 'Error en los datos',
        text: 'Compruebe los parametros del tema',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          console.log('El tema está');
        }
      });
    }
    this.accion();

  }
  accion() {
    if (this.items3.length !== 0) {
     this.tema = true;
   }
 }

 crearTema(model) {
   this.item3 = {
    curso: this.item.nombre,
    tema: model.tema,
    titulo: model.titulo
   };


 }

  comprobacion(tema): boolean {
    let as = true;
    for (const item of this.items3) {
      if (Number(item.payload.doc.data().tema) === Number(tema)) {
        as = false;
      }
    }
    return as;
  }

  upload(event) {
    // Get input file
    console.log('asqui');
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    const filepath = `contenido/${randomId}`;
    this.material = filepath;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // tslint:disable-next-line:max-line-length
    this.downloadURL = 'https://firebasestorage.googleapis.com/v0/b/academe-f159e.appspot.com/o/contenido%2F' + randomId + '?alt=media&token=dac0b284-4dd9-496f-b172-abc183ace7fd';
    console.log(this.downloadURL);
    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();
    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.pathdefault = this.downloadURL)
    ).subscribe();

  }

  ContenidoDelCurso(curso) {
    this.firebaseService.getContenidoPorCurso(curso).subscribe(result => {
      this.items3 = result;
      if (this.items3.length === 0) {
        this.tema = true;
      }
    });

  }

  eliminarTema(item) {
    swal.fire({
      title: '¿Desea eliminar el tema?',
      text: 'Pulse Si para eliminar',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteContenido(item.payload.doc.id);
        this._storage.storage.refFromURL(item.payload.doc.data().contenido).delete()
            .then(res => {console.log(item.payload.doc.data().contenido);
      }, err => {console.log(err);
      });
      }
    });
  }

}
