import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  downloadURL: string;


  exampleForm: FormGroup;
  imagenDefault = '../../assets/img/images.jpeg';

  validation_messages = {
   'nombre': [
     { type: 'required', message: 'El nombre es requerido.' }
   ],
   'autor': [
     { type: 'required', message: 'El nombre del autor es requerido.' }
   ],
   'descripcion': [
     { type: 'required', message: 'La descripcion es requerida.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService,
    private _storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      nombre: ['', Validators.required ],
      autor: ['', Validators.required ],
      descripcion: ['', Validators.required ]
    });
  }

  resetFields() {
    this.imagenDefault = '';
    this.exampleForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    try {
    this.firebaseService.createCurso(value, this.downloadURL)
    .then(
      res => {
        swal.fire({
          title: 'Curso creado',
          text: '',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Entrar'
        }).then((result) => {
          if (result.value) {
            this.resetFields();
            this.router.navigate(['/cursos']);
          }
        });
      }
    );
    } catch (e) {
      swal.fire({
        title: 'Error en los datos',
        text: 'Repasa los datos y vuelve a intentarlo',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
        }
      });
    }
  }


  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    const filepath = `images/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // tslint:disable-next-line:max-line-length
    this.downloadURL = 'https://firebasestorage.googleapis.com/v0/b/academe-f159e.appspot.com/o/images%2F' + randomId + '?alt=media&token=dac0b284-4dd9-496f-b172-abc183ace7fd';


    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();
      // Get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => this.imagenDefault = this.downloadURL)
      ).subscribe();
      console.log(this.downloadURL);
    }

}
