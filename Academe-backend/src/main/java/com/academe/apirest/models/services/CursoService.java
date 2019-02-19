package com.academe.apirest.models.services;

import java.util.List;

import com.academe.apirest.models.entity.Curso;

public interface CursoService {
	
public List<Curso> findAll();
	
	public Curso findById(Long idCurso);
	
	public Curso save(Curso curso);
	
	public void delete(Long id);

}
