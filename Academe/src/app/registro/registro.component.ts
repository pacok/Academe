import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {

    this.signupInfo = new SignUpInfo(
      this.form.nombre,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        swal.fire({
          title: 'Registro realizado',
          text: '¡Haz login para comenzar!',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Entrar'
        }).then((result) => {
          if (result.value) {
            this.logeo();
          }
        });
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        swal.fire({
          title: 'Error en los datos',
          text: 'Revise los campos y vualva a intentarlo',
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
    );
  }

  logeo() {
    this.router.navigate( ['/auth/login'] );
  }
}
