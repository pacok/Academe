![Alt text](https://github.com/pacok/Academe/blob/master/Academe/src/assets/img/logo20.png) 


# Academe
Proyecto ciclo formativo DAM ----> Plataforma de aprendizaje.

## Para iniciarlo

El proyecto consta de tres partes, la carpeta correspondiente al backend ha sido realizada utilizando Spring security con el uso del IDE eclipse-spring tools. La parte del frontend ha sido desarrollada usando Angular 6 mientras que el desarrollo de la aplicación móvil ha sido usando Ionic, en ambos casos se ha utilizado el editor Visual Studio Code.

### Requisitos

Java 8, Spring, Mysql, npm, Angular 6, Ionic 3.

### Instalacion

Para probar el proyecto clonar el repositorio en tu equipo local.

Importar el backend en clipse y lanzarlo. Se iniciara en el puerto 8090 del localhost.

Necesita de una base de datos mysql llamada academeBack (la conexion a la base de datos se puede configurar en el archivo "aplication.properties" que se encuenta en el directorio resources).

Para el frontend desde la carpeta raiz ejecutar en la terminal:

* npm install

Una vez instaladas las dependencias ejecutar:

* ng serve

Se lanzará en el puerto 4200 del localhost

Para la parte móvil en la carpeta Academe_movil(Ionic) ejecutar desde una terminal:

* npm install

Una vez instaladas las dependencias ejecutar:

* Ionic serve

Se lanzará en el puerto 8100 del localhost

También se podrá hacer uso de la herramienta lab de ionic (emulación de dispositivos en el navegador)

* Ionic serve --lab

(si no obtenemos resultado debemos renombrar el archivo app.xxxxxxx.js que se encuentra enla ubucación:

/Academe_movil (Ionic)/node_modules/@ionic/lab/www/build/app por el nombre que nos indica la consola del navegador.

## Probar la aplicacion

Frontend: Abrir el navegador y dirígete a la dirección http:/localhost/4200.

Aplicación Móvil: Abrir el navegador y dirígete a la dirección http:/localhost/8100 o para --lab http:/localhost/8200.

## Tecnologias

* [Angular](https://angular.io/) - Framework para el desarrollo del frontend
* [Firebase](https://firebase.google.com/) - Base de datos en la nube de google
* [Eclipse-Spring](https://spring.io/tools) - IDE para el desarrollo del backend
* [Ionic](https://ionicframework.com/) - framework para el desarrollo de la aplicación para dispositivos móviles
* [Visual Studio Code](https://code.visualstudio.com/) - Editor de texto usado en el desarrollo

## Autor

* **Francisco Camas** - *Github* - [pacok](https://github.com/pacok)

## Licencia
Este proyecto carece de licencias, sientete libre de descargarlo y utilizar el código a tu antojo. :)

