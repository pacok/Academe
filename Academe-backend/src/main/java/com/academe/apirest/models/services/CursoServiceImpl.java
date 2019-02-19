package com.academe.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.academe.apirest.models.dao.CursoDao;
import com.academe.apirest.models.entity.Curso;



@Service
public class CursoServiceImpl implements CursoService{
	
	@Autowired
	private CursoDao cursoDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Curso> findAll(){
		return (List<Curso>) cursoDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Curso findById(Long idCurso) {
		return cursoDao.findById(idCurso).orElse(null);
	}

	@Override
	@Transactional
	public Curso save(Curso curso) {
		return cursoDao.save(curso);
	}

	@Override
	@Transactional
	public void delete(Long idCurso) {
		cursoDao.deleteById(idCurso);
	}

}
