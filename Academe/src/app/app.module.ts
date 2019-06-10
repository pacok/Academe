import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { EditarCursoResolver } from './editar-curso/editar-curso.resolver';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages/module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule } from '@angular/material';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { httpInterceptorProviders } from './auth/auth-interceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { CursosComponent } from './cursos/cursos.component';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { DetallesCursoComponent } from './detalles-curso/detalles-curso.component';
import { CursarComponent } from './cursar/cursar.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { BandejaComponent } from './bandeja/bandeja.component';
import { TemasCursosComponent } from './temas-cursos/temas-cursos.component';
import { ReporteCursosComponent } from './reporte-cursos/reporte-cursos.component';
import { ReporteSubscripcionComponent } from './reporte-subscripcion/reporte-subscripcion.component' ;

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegistroComponent,
    HomeComponent,
    AdminComponent,
    EditarCursoComponent,
    CursosComponent,
    NuevoCursoComponent,
    DetallesCursoComponent,
    CursarComponent,
    ConocenosComponent,
    MensajesComponent,
    BandejaComponent,
    TemasCursosComponent,
    ReporteCursosComponent,
    ReporteSubscripcionComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    FlashMessagesModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [httpInterceptorProviders,
     EditarCursoResolver,
     FirebaseService,
     FlashMessagesService
    ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
