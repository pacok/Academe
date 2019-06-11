import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroComponent } from '../pages/registro/registro.component';
import { CursosPage } from '../pages/cursos/cursos';
import { DetallesCursoPage } from '../pages/detalles-curso/detalles-curso';
import { CursarPage } from '../pages/cursar/cursar';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { BuzonPage } from '../pages/buzon/buzon';


import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage.service';

import { FirebaseService } from '../services/firebase.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroComponent,
    CursosPage,
    DetallesCursoPage,
    CursarPage,
    MensajesPage,
    BuzonPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroComponent,
    CursosPage,
    DetallesCursoPage,
    CursarPage,
    MensajesPage,
    BuzonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    TokenStorageService,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
