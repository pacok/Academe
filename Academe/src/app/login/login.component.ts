import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  usuario: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
   ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.usuario = this.tokenStorage.getUsername();
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        swal.fire({
          title: 'Bienvenido a Academe',
          text: '¡Es la hora del aprendizaje!',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Entrar'
        }).then((result) => {
          if (result.value) {
            this.reloadPage();
          }
        });
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        swal.fire({
          title: 'Error en los datos',
          text: 'Vuelve a introducir Usuario y Contraseña',
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

    /**  Registro para el chat
      const user = {
        username: this.form.username,
      };
      this.userServiceChat.login(user).subscribe(response => {
        console.log(user);
        const res = response.json();
        if (res.isPresent === true) {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.fmService.show('Successfully logged in', {
              cssClass: 'alert-success',
              timeout: 3000
            });
            this.router.navigate(['/']);
        } else {
          this.fmService.show('User not found', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        }
      });*/



  }

  registro() {
    this.router.navigate( ['/signup'] );
  }

  reloadPage() {
    window.location.reload();
  }

}

