package com.academe.security.services;

import com.academe.model.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UsuarioService implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

    private String nombre;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UsuarioService(Long id, String nombre, 
			    		String nombreUsuario, String email, String password, 
			    		Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.nombre = nombre;
        this.username = nombreUsuario;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UsuarioService build(Usuario usuario) {
        List<GrantedAuthority> authorities = usuario.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getNombre().name())
        ).collect(Collectors.toList());

        return new UsuarioService(
        		usuario.getId(),
        		usuario.getNombre(),
        		usuario.getNombreUsuario(),
        		usuario.getEmail(),
        		usuario.getPassword(),
                authorities
        );
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        UsuarioService usuario = (UsuarioService) o;
        return Objects.equals(id, usuario.id);
    }
}