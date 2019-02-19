import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import { CursosComponent } from './cursos/cursos.component';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { EditarCursoResolver } from './editar-curso/editar-curso.resolver';
import { DetallesCursoComponent} from './detalles-curso/detalles-curso.component';
import { CursarComponent } from './cursar/cursar.component' ;
import { ConocenosComponent } from './conocenos/conocenos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { BandejaComponent } from './bandeja/bandeja.component' ;


const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'user', component: UserComponent
    },
    {
        path: 'admin', component: AdminComponent
    },
    {
        path: 'auth/login', component: LoginComponent
    },
    {
        path: 'signup', component: RegistroComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'cursos', component: CursosComponent
    },
    {
        path: 'nuevo-curso', component: NuevoCursoComponent
    },
    {
        path: 'editar/:id', component: EditarCursoComponent, resolve: {data : EditarCursoResolver}
    },
    {
        path: 'detalles-curso/:id', component: DetallesCursoComponent, resolve: {data : EditarCursoResolver}
    },
    {
        path: 'cursar/:id', component: CursarComponent, resolve: {data : EditarCursoResolver}
    },
    {
        path: 'conocenos', component: ConocenosComponent
    },
    {
        path: 'mensajes', component: MensajesComponent
    },
    {
        path: 'bandeja', component: BandejaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
