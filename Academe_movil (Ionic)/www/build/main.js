webpackJsonp([5],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_token_storage_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_login_info__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__registro_registro_component__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//codigo nuevo;





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, tokenStorage, authService, formBuilder) {
        this.navCtrl = navCtrl;
        this.tokenStorage = tokenStorage;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.roles = [];
        this.errorMessage = '';
        this.validation_messages = {
            'usuario': [
                { type: 'required', message: 'El nombre de usuario es obligatorio.' },
                { type: 'pattern', message: 'Introduzca un usuario.' }
            ],
            'password': [
                { type: 'required', message: 'La contraseña es obligatoria.' },
                { type: 'minlength', message: 'La contraseña debe tener al menos 5 carácteres' }
            ]
        };
    }
    LoginPage.prototype.ngOnInit = function () {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            this.usuario = this.tokenStorage.getUsername();
        }
    };
    LoginPage.prototype.ionViewWillLoad = function () {
        this.validations_form = this.formBuilder.group({
            usuario: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
        });
    };
    LoginPage.prototype.tryLogin = function (value) {
        var _this = this;
        this.loginInfo = new __WEBPACK_IMPORTED_MODULE_5__services_auth_login_info__["a" /* AuthLoginInfo */](value.usuario, value.password);
        console.log(value);
        console.log(this.loginInfo);
        this.authService.attemptAuth(this.loginInfo).subscribe(function (data) {
            _this.tokenStorage.saveToken(data.accessToken);
            _this.tokenStorage.saveUsername(data.username);
            _this.tokenStorage.saveAuthorities(data.authorities);
            _this.isLoginFailed = false;
            _this.isLoggedIn = true;
            _this.roles = _this.tokenStorage.getAuthorities();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        }, function (error) {
            _this.errorMessage = error.error.message;
            _this.isLoginFailed = true;
        });
    };
    LoginPage.prototype.goRegisterPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__registro_registro_component__["a" /* RegistroComponent */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar [hideBackButton]="true" color="primary">\n    <ion-title>login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="fadeIn first">\n        <img src="../../assets/imgs/logo2.png" id="icon" alt="User Icon" />\n      </div>\n    <form class="form" [formGroup]="validations_form"  (ngSubmit)="tryLogin(validations_form.value)">\n\n        <ion-item>\n          <ion-label floating color="primary">usuario</ion-label>\n          <ion-input type="text" formControlName="usuario"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.usuario">\n            <div class="error-message" *ngIf="validations_form.get(\'usuario\').hasError(validation.type) && (validations_form.get(\'usuario\').dirty || validations_form.get(\'usuario\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n    \n        <ion-item>\n          <ion-label floating color="primary">Contraseña</ion-label>\n          <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.password">\n            <div class="error-message" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n    \n        <button class="submit-btn" ion-button block type="submit" [disabled]="!validations_form.valid">Log In</button>\n        <label class="error-message">{{errorMessage}}</label>\n      </form>\n      <p class="go-to-register">\n        ¿Aún sin cuenta? <a (click)="goRegisterPage()">Crear una cuenta.</a>\n      </p>\n\n</ion-content>\n'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_token_storage_service__["a" /* TokenStorageService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.loginUrl = 'http://localhost:8090/api/auth/signin';
        this.signupUrl = 'http://localhost:8090/api/auth/signup';
    }
    AuthService.prototype.attemptAuth = function (credentials) {
        return this.http.post(this.loginUrl, credentials, httpOptions);
    };
    AuthService.prototype.signUp = function (info) {
        console.log(info);
        return this.http.post(this.signupUrl, info, httpOptions);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuzonPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BuzonPage = /** @class */ (function () {
    function BuzonPage(navCtrl, firebaseService, token, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.firebaseService = firebaseService;
        this.token = token;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.usuario = this.token.getUsername();
        this.mensajes = false;
    }
    BuzonPage.prototype.ngOnInit = function () {
        this.listarPorUsuario(this.usuario);
    };
    BuzonPage.prototype.listarPorUsuario = function (usuario) {
        var _this = this;
        this.firebaseService.getMensajesPorUsuario(usuario).subscribe(function (result) {
            _this.items = result;
        });
    };
    BuzonPage.prototype.eliminarMensaje = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Eliminar Mensaje',
            message: '¿Está seguro de que desea eliminarlo?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.firebaseService.deleteMensaje(item.payload.doc.id);
                    }
                }
            ]
        });
        alert.present();
    };
    BuzonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buzon',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/buzon/buzon.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Buzón de Entrada</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="masters" padding>\n  <ion-card *ngFor="let item of items">\n    <h3 *ngIf="mensajes">No tienes ningun mensaje.</h3>\n    <ion-card-title text-center color="primary">Mensaje de: {{item.payload.doc.data().de}}</ion-card-title>\n\n    <ion-card-content>\n      <h5>Asunto: {{item.payload.doc.data().asunto}}</h5>\n      <h5>Mensaje:</h5>\n      <ion-card>\n        <h5> {{item.payload.doc.data().mensaje}}</h5>\n      </ion-card>\n\n      <button ion-button float-right color="danger" (click)="eliminarMensaje(item)"> Eliminar\n        Mensaje</button>\n\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/buzon/buzon.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__["a" /* TokenStorageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], BuzonPage);
    return BuzonPage;
}());

//# sourceMappingURL=buzon.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CursarPage = /** @class */ (function () {
    function CursarPage(navCtrl, navParams, alertCtrl, firebaseService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.firebaseService = firebaseService;
        this.tema = false;
    }
    CursarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CursarPage');
    };
    CursarPage.prototype.ngOnInit = function () {
        this.getData();
        this.ContenidoDelCurso(this.item.nombre);
    };
    CursarPage.prototype.getData = function () {
        this.item = this.navParams.get('data');
    };
    CursarPage.prototype.ContenidoDelCurso = function (curso) {
        var _this = this;
        console.log(curso);
        console.log('buscando contenido');
        this.firebaseService.getContenidoPorCurso(curso).subscribe(function (result) {
            _this.items4 = result;
            if (_this.items4.length === 0) {
                _this.tema = true;
            }
        });
    };
    CursarPage.prototype.eliminarSubscripcion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Eliminar Subscripción',
            message: '¿Está seguro de que desea eliminarla?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.firebaseService.deleteSubscripcion(_this.item.id);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    CursarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cursar',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/cursar/cursar.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Curso {{item.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="masters" padding>\n  <ion-card>\n    <ion-card-header>\n      <img class="card-img-top" [src]="item.imagen" alt="Card image cap">\n    </ion-card-header>\n    <ion-card-content>\n      <ion-item>Autor: {{item.autor}}</ion-item>\n      {{item.descripcion}}\n      <ion-item>\n        <button ion-button color="danger" (click)="eliminarSubscripcion()">Eliminar Subscripción</button>\n      </ion-item>\n    </ion-card-content>\n\n  </ion-card>\n\n  <div>\n    <h3 *ngIf="tema">No se ha subido contenido para este curso.</h3>\n    <h4 *ngIf="!tema">Contenido del curso:</h4>\n    <div class="list-mini">\n      <ion-list>\n        <ion-item *ngFor="let item2 of items4">\n          <p> Tema: {{item2.payload.doc.data().tema}}</p>\n          <h2>Titulo: {{item2.payload.doc.data().titulo}}</h2>\n          <a href="{{item2.payload.doc.data().contenido}}" class="btn btn-primary mr-2">Descargar Contenido</a>\n        </ion-item>\n      </ion-list>\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/cursar/cursar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
    ], CursarPage);
    return CursarPage;
}());

//# sourceMappingURL=cursar.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalles_curso_detalles_curso__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CursosPage = /** @class */ (function () {
    function CursosPage(navCtrl, navParams, firebaseService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebaseService = firebaseService;
        this.searchValue = '';
    }
    CursosPage.prototype.ngOnInit = function () {
        this.getData();
    };
    CursosPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getCursos()
            .subscribe(function (result) {
            _this.items = result;
            _this.name_filtered_items = result;
        });
    };
    CursosPage.prototype.searchByName = function () {
        var _this = this;
        var value = this.searchValue.toLowerCase();
        this.firebaseService.searchCursos(value)
            .subscribe(function (result) {
            _this.name_filtered_items = result;
            _this.items = _this.combineLists(result, _this.name_filtered_items);
        });
    };
    CursosPage.prototype.combineLists = function (a, b) {
        var result = [];
        a.filter(function (x) {
            return b.filter(function (x2) {
                if (x2.payload.doc.id === x.payload.doc.id) {
                    result.push(x2);
                }
            });
        });
        return result;
    };
    CursosPage.prototype.viewDetails = function (item) {
        // debugger
        var data = {
            nombre: item.nombre,
            autor: item.autor,
            descripcion: item.descripcion,
            imagen: item.imagen
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detalles_curso_detalles_curso__["a" /* DetallesCursoPage */], {
            data: data
        });
    };
    CursosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cursos',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/cursos/cursos.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Cursos Ofertados</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="masters" padding>\n\n  <div class="input-group">\n    <input type="text" class="form-control" [(ngModel)]="searchValue" [ngModelOptions]="{standalone: true}" placeholder="Buscar por nombre..." (keyup)="searchByName()">\n  </div>\n    \n\n    <ion-card *ngFor="let item of items">\n        \n        <ion-card-header>  \n          <img [src]="item.payload.doc.data().imagen" >       \n          <ion-card-title>{{item.payload.doc.data().nombre}}</ion-card-title>\n        </ion-card-header>\n      \n        <ion-card-content>\n          <ion-item>\n              Autor: {{item.payload.doc.data().autor}}\n          </ion-item>\n          <ion-item>\n            <button ion-button full color="primary" (click)="viewDetails(item.payload.doc.data())">Ver Detalles</button>\n            </ion-item>\n        </ion-card-content>\n      </ion-card>\n\n    \n</ion-content>\n'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/cursos/cursos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
    ], CursosPage);
    return CursosPage;
}());

//# sourceMappingURL=cursos.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetallesCursoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the DetallesCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetallesCursoPage = /** @class */ (function () {
    function DetallesCursoPage(navCtrl, navParams, firebaseService, token, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebaseService = firebaseService;
        this.token = token;
        this.alertCtrl = alertCtrl;
    }
    DetallesCursoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallesCursoPage');
    };
    DetallesCursoPage.prototype.ngOnInit = function () {
        this.getData();
    };
    DetallesCursoPage.prototype.getData = function () {
        this.item = this.navParams.get('data');
    };
    DetallesCursoPage.prototype.suscribirse = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Subscribirse al Curso',
            message: '¿Está seguro de que desea subscribirse?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.usuario = _this.token.getUsername();
                        _this.firebaseService.subscribirCurso(_this.usuario, _this.item.nombre);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    DetallesCursoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detalles-curso',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/detalles-curso/detalles-curso.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>detallesCurso</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="masters" padding>\n  <ion-card>\n    <ion-card-header>\n      <img class="card-img-top" [src]="item.imagen" alt="Card image cap">\n      <ion-card-title>{{item.nombre}}</ion-card-title>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-item>Autor: {{item.autor}}</ion-item>\n      {{item.descripcion}}\n      <ion-item>\n        <button ion-button full color="primary" (click)="suscribirse()">Suscribirse</button>\n      </ion-item>\n    </ion-card-content>\n    <ion-row class="cardfooter">\n      <ion-col align-self: center>\n        <p>Academe 2019 &copy;</p>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/detalles-curso/detalles-curso.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__["a" /* TokenStorageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], DetallesCursoPage);
    return DetallesCursoPage;
}());

//# sourceMappingURL=detalles-curso.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MensajesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MensajesPage = /** @class */ (function () {
    function MensajesPage(firebaseService, token, navCtrl, fb, formBuilder2, navParams, alertCtrl) {
        this.firebaseService = firebaseService;
        this.token = token;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.formBuilder2 = formBuilder2;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.usuarioAcutal = this.token.getUsername();
        this.errorMessage = '';
        this.validation_messages = {
            'para': [
                { type: 'required', message: 'El destinatario es obligatorio.' },
                { type: 'pattern', message: 'Seleccione un nombre.' }
            ],
            'asunto': [
                { type: 'required', message: 'El asunto es obligatorio.' },
                { type: 'pattern', message: 'Indique el asunto del mensaje.' }
            ],
            'mensaje': [
                { type: 'required', message: 'El mensaje es obligatorio.' },
                { type: 'pattern', message: 'Debe escribir algo en el cuerpo del mensaje.' }
            ]
        };
    }
    MensajesPage.prototype.ionViewWillLoad = function () {
        this.validations_form = this.formBuilder2.group({
            de: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required
            ])),
            para: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required
            ])),
            asunto: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required
            ])),
            mensaje: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required
            ]))
        });
    };
    MensajesPage.prototype.ngOnInit = function () {
        this.createForm();
        this.sacarUsuarios();
    };
    MensajesPage.prototype.createForm = function () {
        this.exampleForm = this.fb.group({
            de: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            para: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            asunto: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            mensaje: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required]
        });
    };
    MensajesPage.prototype.onSubmit = function (value) {
        var _this = this;
        var data = {
            de: value.de,
            para: value.para[0],
            asunto: value.asunto,
            mensaje: value.mensaje
        };
        console.log(value);
        console.log(data);
        var alert = this.alertCtrl.create({
            title: 'Mensaje Enviado',
            subTitle: 'Pulse Ok para finalizar',
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.firebaseService.crearMensaje(data);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    }
                }]
        });
        alert.present();
    };
    MensajesPage.prototype.sacarUsuarios = function () {
        var _this = this;
        this.subscriptoresArray = [];
        this.firebaseService.getSubscripciones().subscribe(function (result) {
            _this.usuarios = result;
            _this.usuarios.forEach(function (item) {
                _this.subscriptoresArray.push(item.payload.doc.data().alumno);
            });
            _this.subscriptoresArrayFinal = _this.eliminarDuplicados(_this.subscriptoresArray);
        });
    };
    MensajesPage.prototype.eliminarDuplicados = function (arr) {
        var i;
        var len = arr.length;
        var out = [];
        var obj = {};
        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        // tslint:disable-next-line:forin
        for (i in obj) {
            out.push(i);
        }
        return out;
    };
    MensajesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mensajes',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/mensajes/mensajes.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Enviar Mensajes</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form class="form" [formGroup]="validations_form" (ngSubmit)="onSubmit(validations_form.value)">\n\n    <ion-item>\n      <ion-label floating color="primary">De:</ion-label>\n      <ion-input type="text" value="{{usuarioAcutal}}" formControlName="de"></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.de">\n        <div class="error-message"\n          *ngIf="validations_form.get(\'de\').hasError(validation.type) && (validations_form.get(\'de\').dirty || validations_form.get(\'nombre\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <ion-item>\n      <ion-label>Para</ion-label>\n      <ion-select formControlName="para" class="form-controll" [(ngModel)]="gaming" multiple="true"\n        cancelText="Cancelar" okText="Seleccionar">\n        <ion-option *ngFor="let subscriptores of subscriptoresArrayFinal" value="{{subscriptores}}">{{subscriptores}}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.para">\n        <div class="error-message"\n          *ngIf="validations_form.get(\'para\').hasError(validation.type) && (validations_form.get(\'para\').dirty || validations_form.get(\'para\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n    <ion-item>\n      <ion-label floating color="primary">Asunto</ion-label>\n      <ion-input type="text" formControlName="asunto" class="form-controll" required></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.asunto">\n        <div class="error-message"\n          *ngIf="validations_form.get(\'asunto\').hasError(validation.type) && (validations_form.get(\'asunto\').dirty || validations_form.get(\'asunto\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n    <ion-item>\n      <ion-textarea formControlName="mensaje" class="form-controll" required placeholder="Escriba el mensahe aquí...">\n      </ion-textarea>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.mensaje">\n        <div class="error-message"\n          *ngIf="validations_form.get(\'mensaje\').hasError(validation.type) && (validations_form.get(\'mensaje\').dirty || validations_form.get(\'mensaje\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <button class="submit-btn" ion-button block type="submit" [disabled]="!validations_form.valid">Enviar\n      mensaje</button>\n    <label class="error-message">{{errorMessage}}</label>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/mensajes/mensajes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__["a" /* TokenStorageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MensajesPage);
    return MensajesPage;
}());

//# sourceMappingURL=mensajes.js.map

/***/ }),

/***/ 203:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 203;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/buzon/buzon.module": [
		498,
		4
	],
	"../pages/cursar/cursar.module": [
		499,
		3
	],
	"../pages/cursos/cursos.module": [
		500,
		2
	],
	"../pages/detalles-curso/detalles-curso.module": [
		501,
		1
	],
	"../pages/mensajes/mensajes.module": [
		502,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 245;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_signup_info__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_auth_service__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegistroComponent = /** @class */ (function () {
    function RegistroComponent(navCtrl, formBuilder2, authService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder2 = formBuilder2;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.isSignedUp = false;
        this.isSignUpFailed = false;
        this.errorMessage = '';
        this.validation_messages = {
            'nombre': [
                { type: 'required', message: 'El nombre es obligatorio.' },
                { type: 'pattern', message: 'Introduzca un nombre.' }
            ],
            'usuario': [
                { type: 'required', message: 'El nombre de usuario es obligatorio.' },
                { type: 'pattern', message: 'Introduzca un nombre de usuario.' }
            ],
            'password': [
                { type: 'required', message: 'La contraseña es obligatoria.' },
                { type: 'minlength', message: 'La contraseña debe tener al menos 5 carácteres' }
            ],
            'email': [
                { type: 'required', message: 'El email es obligatorio.' },
                { type: 'pattern', message: 'Introduzca una dirección de correo válida.' }
            ],
        };
    }
    RegistroComponent.prototype.ngOnInit = function () { };
    RegistroComponent.prototype.ionViewWillLoad = function () {
        this.validations_form = this.formBuilder2.group({
            nombre: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            usuario: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
        });
    };
    RegistroComponent.prototype.tryRegister = function (value) {
        var _this = this;
        this.signupInfo = new __WEBPACK_IMPORTED_MODULE_3__services_auth_signup_info__["a" /* SignUpInfo */](value.nombre, value.usuario, value.email, value.password);
        this.authService.signUp(this.signupInfo).subscribe(function (data) {
            _this.isSignedUp = true;
            _this.isSignUpFailed = false;
            _this.logeo();
        }, function (error) {
            _this.errorMessage = error.error.message;
            _this.isSignUpFailed = true;
        });
    };
    RegistroComponent.prototype.logeo = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Usuario Registrado',
            subTitle: 'Pulse Ok para hacer login',
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                    }
                }]
        });
        alert.present();
    };
    RegistroComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-registro',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/registro/registro.component.html"*/'<ion-header>\n    <ion-navbar color="primary">    \n      \n        <ion-title>Formulario de Registro</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n      \n      <form class="form" [formGroup]="validations_form"  (ngSubmit)="tryRegister(validations_form.value)">\n  \n          <ion-item>\n            <ion-label floating color="primary">Nombre</ion-label>\n            <ion-input type="text" formControlName="nombre"></ion-input>\n          </ion-item>\n          <div class="validation-errors">\n            <ng-container *ngFor="let validation of validation_messages.nombre">\n              <div class="error-message" *ngIf="validations_form.get(\'nombre\').hasError(validation.type) && (validations_form.get(\'nombre\').dirty || validations_form.get(\'nombre\').touched)">\n                {{ validation.message }}\n              </div>\n            </ng-container>\n          </div>\n      \n          <ion-item>\n            <ion-label floating color="primary">Usuario</ion-label>\n            <ion-input type="text" formControlName="usuario" class="form-controll" required></ion-input>\n          </ion-item>\n          <div class="validation-errors">\n            <ng-container *ngFor="let validation of validation_messages.usuario">\n              <div class="error-message" *ngIf="validations_form.get(\'usuario\').hasError(validation.type) && (validations_form.get(\'usuario\').dirty || validations_form.get(\'usuario\').touched)">\n                {{ validation.message }}\n              </div>\n            </ng-container>\n          </div>\n\n          <ion-item>\n              <ion-label floating color="primary">Email</ion-label>\n              <ion-input type="text" formControlName="email" class="form-controll" required></ion-input>\n            </ion-item>\n            <div class="validation-errors">\n              <ng-container *ngFor="let validation of validation_messages.email">\n                <div class="error-message" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n                  {{ validation.message }}\n                </div>\n              </ng-container>\n            </div>\n\n            <ion-item>\n                <ion-label floating color="primary">Contraseña</ion-label>\n                <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>\n              </ion-item>\n              <div class="validation-errors">\n                <ng-container *ngFor="let validation of validation_messages.usuario">\n                  <div class="error-message" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n                    {{ validation.message }}\n                  </div>\n                </ng-container>\n              </div>\n             \n      \n          <button class="submit-btn" ion-button block type="submit" [disabled]="!validations_form.valid">Registrarse</button>\n          <label class="error-message">{{errorMessage}}</label>\n\n        </form>\n       \n  \n  </ion-content>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/registro/registro.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegistroComponent);
    return RegistroComponent;
}());

//# sourceMappingURL=registro.component.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_cursos_cursos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_detalles_curso_detalles_curso__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_cursar_cursar__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_mensajes_mensajes__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_buzon_buzon__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_auth_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_token_storage_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_fire_firestore__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__environments_environment__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_common_http__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro_component__["a" /* RegistroComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_cursos_cursos__["a" /* CursosPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_detalles_curso_detalles_curso__["a" /* DetallesCursoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cursar_cursar__["a" /* CursarPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_mensajes_mensajes__["a" /* MensajesPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_buzon_buzon__["a" /* BuzonPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_fire__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_19__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_18__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/buzon/buzon.module#BuzonPageModule', name: 'BuzonPage', segment: 'buzon', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cursar/cursar.module#CursarPageModule', name: 'CursarPage', segment: 'cursar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cursos/cursos.module#CursosPageModule', name: 'CursosPage', segment: 'cursos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detalles-curso/detalles-curso.module#DetallesCursoPageModule', name: 'DetallesCursoPage', segment: 'detalles-curso', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mensajes/mensajes.module#MensajesPageModule', name: 'MensajesPage', segment: 'mensajes', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registro_registro_component__["a" /* RegistroComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_cursos_cursos__["a" /* CursosPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_detalles_curso_detalles_curso__["a" /* DetallesCursoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cursar_cursar__["a" /* CursarPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_mensajes_mensajes__["a" /* MensajesPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_buzon_buzon__["a" /* BuzonPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__services_auth_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_15__services_auth_token_storage_service__["a" /* TokenStorageService */],
                __WEBPACK_IMPORTED_MODULE_16__services_firebase_service__["a" /* FirebaseService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__ = __webpack_require__(246);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FirebaseService = /** @class */ (function () {
    function FirebaseService(db) {
        this.db = db;
    }
    FirebaseService.prototype.getImagenes = function () {
        return this.db.collection('/imagen').valueChanges();
    };
    FirebaseService.prototype.getCurso = function (cursoKey) {
        return this.db.collection('cursos').doc(cursoKey).snapshotChanges();
    };
    FirebaseService.prototype.updateCurso = function (cursoKey, value) {
        value.nameToSearch = value.nombre.toLowerCase();
        return this.db.collection('cursos').doc(cursoKey).set(value);
    };
    FirebaseService.prototype.deleteCurso = function (cursoKey) {
        return this.db.collection('cursos').doc(cursoKey).delete();
    };
    FirebaseService.prototype.getCursos = function () {
        return this.db.collection('cursos').snapshotChanges();
    };
    FirebaseService.prototype.searchCursos = function (searchValue) {
        return this.db.collection('cursos', function (ref) { return ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'); })
            .snapshotChanges();
    };
    FirebaseService.prototype.createCurso = function (value, imagen) {
        return this.db.collection('cursos').add({
            nombre: value.nombre,
            nameToSearch: value.nombre.toLowerCase(),
            autor: value.autor,
            descripcion: value.descripcion,
            imagen: imagen
        });
    };
    FirebaseService.prototype.subscribirCurso = function (usuario, curso2) {
        return this.db.collection('subscripciones').add({
            alumno: usuario,
            curso: curso2
        });
    };
    FirebaseService.prototype.getSubscripciones = function () {
        return this.db.collection('subscripciones').snapshotChanges();
    };
    FirebaseService.prototype.getSubscripcionesPorUsuario = function (usuario) {
        return this.db.collection('subscripciones', function (ref) { return ref.where('alumno', '==', usuario); }).snapshotChanges();
    };
    FirebaseService.prototype.deleteSubscripcion = function (subscripcionKey) {
        return this.db.collection('subscripciones').doc(subscripcionKey).delete();
    };
    FirebaseService.prototype.getCursosPorNombre = function (nombreCurso) {
        return this.db.collection('cursos', function (ref) { return ref.where('nombre', '==', nombreCurso); }).snapshotChanges();
    };
    FirebaseService.prototype.crearMensaje = function (value) {
        return this.db.collection('mensajes').add({
            de: value.de,
            para: value.para,
            asunto: value.asunto,
            mensaje: value.mensaje
        });
    };
    FirebaseService.prototype.getMensajesPorUsuario = function (usuario) {
        return this.db.collection('mensajes', function (ref) { return ref.where('para', '==', usuario); }).snapshotChanges();
    };
    FirebaseService.prototype.deleteMensaje = function (subscripcionKey) {
        return this.db.collection('mensajes').doc(subscripcionKey).delete();
    };
    FirebaseService.prototype.getContenidoPorCurso = function (curso) {
        return this.db.collection('temas', function (ref) { return ref.where('curso', '==', curso); }).snapshotChanges();
    };
    FirebaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], FirebaseService);
    return FirebaseService;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n<ion-footer>\n    <ion-toolbar color="primary">\n      <ion-buttons full>        \n        <button ion-button end>\n            Academe 2019 &copy;\n          </button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthLoginInfo; });
var AuthLoginInfo = /** @class */ (function () {
    function AuthLoginInfo(username, password) {
        this.username = username;
        this.password = password;
    }
    return AuthLoginInfo;
}());

//# sourceMappingURL=login-info.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpInfo; });
var SignUpInfo = /** @class */ (function () {
    function SignUpInfo(nombre, username, email, password) {
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = ['usuario'];
    }
    return SignUpInfo;
}());

//# sourceMappingURL=signup-info.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDei5ilT9hxHGlKFRx5sG3R4D8YRJhqATs',
        authDomain: 'academe-f159e.firebaseapp.com',
        databaseURL: 'https://academe-f159e.firebaseio.com',
        projectId: 'academe-f159e',
        storageBucket: 'academe-f159e.appspot.com',
        messagingSenderId: '165639057068'
    }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TOKEN_KEY = 'AuthToken';
var USERNAME_KEY = 'AuthUsername';
var AUTHORITIES_KEY = 'AuthAuthorities';
var TokenStorageService = /** @class */ (function () {
    function TokenStorageService() {
        this.roles = [];
    }
    TokenStorageService.prototype.signOut = function () {
        window.sessionStorage.clear();
    };
    TokenStorageService.prototype.saveToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    };
    TokenStorageService.prototype.getToken = function () {
        return sessionStorage.getItem(TOKEN_KEY);
    };
    TokenStorageService.prototype.saveUsername = function (username) {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, username);
    };
    TokenStorageService.prototype.getUsername = function () {
        return sessionStorage.getItem(USERNAME_KEY);
    };
    TokenStorageService.prototype.saveAuthorities = function (authorities) {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    };
    TokenStorageService.prototype.getAuthorities = function () {
        var _this = this;
        this.roles = [];
        if (sessionStorage.getItem(TOKEN_KEY)) {
            JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(function (authority) {
                _this.roles.push(authority.authority);
            });
        }
        return this.roles;
    };
    TokenStorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TokenStorageService);
    return TokenStorageService;
}());

//# sourceMappingURL=token-storage.service.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cursos_cursos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cursar_cursar__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mensajes_mensajes__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buzon_buzon__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, token, alertCtrl, firebaseService) {
        this.navCtrl = navCtrl;
        this.token = token;
        this.alertCtrl = alertCtrl;
        this.firebaseService = firebaseService;
        this.valor = false;
        this.ocultar = false;
    }
    HomePage.prototype.ngOnInit = function () {
        this.info = {
            token: this.token.getToken(),
            username: this.token.getUsername(),
            authorities: this.token.getAuthorities()
        };
        this.listarPorUsuario(this.token.getUsername());
    };
    HomePage.prototype.IraCursos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cursos_cursos__["a" /* CursosPage */]);
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cerrar Sesión',
            message: '¿Está seguro de que desea salir?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.token.signOut();
                        window.location.reload();
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.despMensajes = function () {
        this.valor = !this.valor;
    };
    HomePage.prototype.despSubscripciones = function () {
        this.ocultar = !this.ocultar;
    };
    HomePage.prototype.listarPorUsuario = function (usuario) {
        var _this = this;
        this.firebaseService.getSubscripcionesPorUsuario(usuario).subscribe(function (result) {
            _this.subscripciones = result;
        });
    };
    HomePage.prototype.localizarCursoPorNombre = function (item) {
        var _this = this;
        this.firebaseService.getCursosPorNombre(item.payload.doc.data().curso).subscribe(function (result) {
            _this.item4 = result;
            _this.IrACursar(_this.item4[0], item.payload.doc.id);
        });
    };
    HomePage.prototype.IrACursar = function (item, id) {
        var data = {
            nombre: item.payload.doc.data().nombre,
            autor: item.payload.doc.data().autor,
            descripcion: item.payload.doc.data().descripcion,
            imagen: item.payload.doc.data().imagen,
            id: id
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__cursar_cursar__["a" /* CursarPage */], {
            data: data
        });
    };
    HomePage.prototype.IrAMensajes = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__mensajes_mensajes__["a" /* MensajesPage */]);
    };
    HomePage.prototype.IrABuzon = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__buzon_buzon__["a" /* BuzonPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar [hideBackButton]="true" color="primary">\n    <ion-title>Academe</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <div>\n      <ion-title>Bienvenid@: {{info.username}}</ion-title>\n      <button ion-button float-right icon-end color="danger" (click)="logout()">\n        Salir\n        <ion-icon name="exit"></ion-icon>\n      </button>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding class="masters">\n\n  <div *ngIf="info.token; else loggedOut">\n\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title color="primary">Cursos Disponibles</ion-card-title>\n        <button ion-button full color="primary" (click)="IraCursos()">\n          Consultar\n        </button>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title color="primary">Mis Subscripciones</ion-card-title>\n        <button *ngIf="!ocultar" ion-button full color="primary" (click)="despSubscripciones()">\n          Ver mis Subscripciones\n        </button>\n        <button *ngIf="ocultar" ion-button full color="primary" (click)="despSubscripciones()">\n          Ocultar Subscripciones\n        </button>\n      </ion-card-content>\n      <ion-card *ngIf="ocultar">\n        <ion-card *ngFor="let item3 of subscripciones">\n          <button ion-button full color="secondary" (click)="localizarCursoPorNombre(item3)">\n            Curso: {{item3.payload.doc.data().curso}}\n          </button>\n        </ion-card>\n      </ion-card>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title color="primary">Mensajes</ion-card-title>\n        <button ion-button full color="primary" (click)="despMensajes()">\n          Administar Mensajes\n        </button>\n      </ion-card-content>\n      <ion-card *ngIf="valor">\n        <ion-card-content>\n          <button ion-button full icon-end color="secondary" (click)="IrAMensajes()">\n            Enviar Mensaje\n            <ion-icon name="chatboxes"></ion-icon>\n          </button>\n          <button ion-button full icon-end color="secondary" (click)="IrABuzon()">\n            Buzón de Entrada\n            <ion-icon name="folder-open"></ion-icon>\n          </button>\n        </ion-card-content>\n      </ion-card>\n    </ion-card>\n\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/praseo/Documents/Dam/Programacion multimedia/Ionic/Academe/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_token_storage_service__["a" /* TokenStorageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[297]);
//# sourceMappingURL=main.js.map