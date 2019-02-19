package com.academe.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.academe.apirest.models.entity.Usuario;

public interface UsuarioDao extends CrudRepository<Usuario, Long> {

}
