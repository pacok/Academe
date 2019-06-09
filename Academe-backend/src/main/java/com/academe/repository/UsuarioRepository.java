package com.academe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.academe.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String nombreUsuario);
    Boolean existsByUsername(String nombreUsuario);
    Boolean existsByEmail(String email);
}