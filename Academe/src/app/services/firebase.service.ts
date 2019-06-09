import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getImagenes() {
      return this.db.collection('/imagen').valueChanges();
  }

  getCurso(cursoKey) {
    return this.db.collection('cursos').doc(cursoKey).snapshotChanges();
  }

  updateCurso(cursoKey, value) {
    value.nameToSearch = value.nombre.toLowerCase();
    return this.db.collection('cursos').doc(cursoKey).set(value);
  }

  deleteCurso(cursoKey) {
    return this.db.collection('cursos').doc(cursoKey).delete();
  }

  getCursos() {
    return this.db.collection('cursos').snapshotChanges();
  }

  searchCursos(searchValue) {
    return this.db.collection('cursos', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

   createCurso(value, imagen) {
    return this.db.collection('cursos').add({
      nombre: value.nombre,
      nameToSearch: value.nombre.toLowerCase(),
      autor: value.autor,
      descripcion: value.descripcion,
      imagen: imagen
    });
  }

  createContenido(item, contenido) {
    return this.db.collection('temas').add({
      curso: item.curso,
      tema: item.tema,
      titulo: item.titulo,
      contenido: contenido
    });
  }
  deleteContenido(contenidoKey) {
    return this.db.collection('temas').doc(contenidoKey).delete();

  }
  getContenidoPorCurso(curso) {
    return this.db.collection('temas', ref => ref.where('curso', '==', curso)
    ).snapshotChanges();
  }

  subscribirCurso(usuario, curso2) {
    return this.db.collection('subscripciones').add({
      alumno: usuario,
      curso: curso2
    });
  }

  getSubscripciones() {
    return this.db.collection('subscripciones').snapshotChanges();
  }

  getSubscripcionesPorUsuario(usuario) {
    return this.db.collection('subscripciones', ref => ref.where('alumno', '==', usuario)
    ).snapshotChanges();
  }

  deleteSubscripcion(subscripcionKey) {
    return this.db.collection('subscripciones').doc(subscripcionKey).delete();
  }

  getCursosPorNombre(nombreCurso) {
    return this.db.collection('cursos', ref => ref.where('nombre', '==', nombreCurso)
    ).snapshotChanges();
  }

  crearMensaje(value) {
    return this.db.collection('mensajes').add({
      de: value.de,
      para: value.para,
      asunto: value.asunto,
      mensaje: value.mensaje
    });
  }

  getMensajesPorUsuario(usuario) {
    return this.db.collection('mensajes', ref => ref.where('para', '==', usuario)
    ).snapshotChanges();
  }

  deleteMensaje(subscripcionKey) {
    return this.db.collection('mensajes').doc(subscripcionKey).delete();
  }

}
