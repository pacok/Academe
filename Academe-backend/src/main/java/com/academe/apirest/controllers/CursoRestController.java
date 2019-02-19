package com.academe.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.academe.apirest.models.entity.Curso;
import com.academe.apirest.models.services.CursoService;



@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class CursoRestController {

	@Autowired
	private CursoService cursoService;
	
	@GetMapping("/cursos")
	public List<Curso> index(){
		return cursoService.findAll();
		
	}
	
	@GetMapping("/cursos/{idCurso}")
	public Curso show(@PathVariable Long idCurso) {
		return cursoService.findById(idCurso);
	}
	
	@PostMapping("/cursos")
	@ResponseStatus(HttpStatus.CREATED)
	public Curso create(@RequestBody Curso curso) {
		return cursoService.save(curso);
	}
	
	@PutMapping("/cursos/{idCurso}")	
	@ResponseStatus(HttpStatus.CREATED)
	public Curso update(@RequestBody Curso curso, @PathVariable Long idCurso) {
		Curso cursoActual = cursoService.findById(idCurso);
		cursoActual.setNombre(curso.getNombre());
		cursoActual.setDescripcion(curso.getDescripcion());
		cursoActual.setImagen(curso.getImagen());
		cursoActual.setMaterial(curso.getMaterial());
		return cursoService.save(cursoActual);
	}
	
	@DeleteMapping("/cursos/{idCurso}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete (@PathVariable Long idCurso) {
		cursoService.delete(idCurso);
	}

}

